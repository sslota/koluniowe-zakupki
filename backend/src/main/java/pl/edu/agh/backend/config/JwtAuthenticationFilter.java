package pl.edu.agh.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;


    //Metoda odczytuje nagłówek "Authorization" z żądania HTTP
    // przy użyciu request.getHeader("Authorization") i sprawdza, czy token JWT
    // jest obecny i ma poprawny format "Bearer ", czyli czy zaczyna się od "Bearer ".

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;
        if(authHeader == null || !authHeader.startsWith("Bearer ")){ //Jeśli token JWT nie jest obecny lub ma niepoprawny format, filtr przepuszcza żądanie dalej przez łańcuch filtrów używając filterChain
            filterChain.doFilter(request, response);
            return ;
        }
        jwtToken = authHeader.substring(7); //7 bo Bearer + space
        username =  jwtService.extractUsername(jwtToken);//Jeśli token JWT jest obecny i ma poprawny format, to jest odcinane prefiks "Bearer ", a następnie jest wywoływana metoda extractUsername w celu wydobycia username z tokenu JWT przy użyciu jwtService.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if(jwtService.isTokenValid(jwtToken, userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
