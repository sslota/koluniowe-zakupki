package pl.edu.agh.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    //bean, który konfiguruje mechanizmy zabezpieczeń przy użyciu obiektu HttpSecurity z Spring Security.
    // Metody na obiekcie HttpSecurity są wykorzystywane do definiowania reguł zabezpieczeń w aplikacji
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors()
                .and()
                .csrf().disable() //Wyłącza ochronę przed atakami CSRF (Cross-Site Request Forgery).
                .authorizeHttpRequests() //Rozpoczyna konfigurację reguł autoryzacji.
                .requestMatchers("/api/v1/auth/**").permitAll() //Ustala, że wszystkie żądania spełniające wzorzec "/api/v1/**" mają być dostępne dla wszystkich (bez wymagania uwierzytelnienia)
                .anyRequest().authenticated() //Wymaga uwierzytelnienia dla innych żądań, które nie spełniają wcześniejszego wzorca.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  //Konfiguruje zarządzanie sesjami, ustawiając tryb STATELESS, co oznacza, że sesje nie będą tworzone ani zarządzane przez Spring Security
                .and()
                .authenticationProvider(authenticationProvider) //Rejestruje wcześniej zdefiniowany AuthenticationProvider
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) //Dodaje filtr JwtAuthenticationFilter przed filtrem UsernamePasswordAuthenticationFilter, co pozwala na obsługę uwierzytelniania opartego na JWT w procesie uwierzytelniania
                .build();
    }

}
