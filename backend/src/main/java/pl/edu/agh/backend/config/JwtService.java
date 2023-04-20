package pl.edu.agh.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "77217A25432A462D4A404E635266556A586E3272357538782F413F4428472B4B";

    // publiczna metoda, która przyjmuje token JWT jako argument i zwraca nazwę użytkownika (username) wyodrębnioną z tokenu
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); //subject -> username
    }

    //    Jest to generyczna metoda, która przyjmuje token JWT oraz funkcję (claimsResolver)
//    jako argumenty i zwraca wyekstrahowany z tokena pojedynczy claim
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) { //to extract single claim
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    //metoda generuje token JWT z uwzględnieniem dodatkowych claimów, nazwy użytkownika,
    // czasu wygaśnięcia oraz podpisuje go za pomocą klucza, który jest uzyskiwany z metody getSignInKey(),
    // i algorytmu podpisu HS256. Wygenerowany token JWT jest zwracany jako string.
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims) //extraClaims dodatkowe dane które będą zawarte w tokenie
                .setSubject(userDetails.getUsername()) //ustawia podmiot tokenu JWT na nazwę użytkownika otrzymaną z obiektu userDetails
                .setIssuedAt(new Date(System.currentTimeMillis())) //czas wygenerowania tokenu
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) //czas wygaśnięcia tokenu
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) //podpoisuje token przy użycia klucza oraz algorytmu podpisu HS256
                .compact();  //Generuje ostateczny token JWT w postaci skompaktowanej (base64url-encoded string).
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //metoda, która przyjmuje token JWT jako argument i zwraca obiekt Claims,
    // który jest reprezentacją zdekodowanych claimów z tokenu JWT.
    // Wykorzystuje ona bibliotekę JJWT (Java JWT) do parsowania i weryfikacji podpisu tokenu JWT.
    // Metoda parseClaimsJws(token) zwraca zawartość ciała (body) tokenu JWT, czyli claimy,
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey()) //verify that the sender of the JWT is who it claims to be, to be ensured that the message wasn't change along they way
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //    metoda, która zwraca klucz używany do weryfikacji podpisu tokenu JWT.
//    Wykorzystuje ona wartość SECRET_KEY, która jest kodowana w formacie BASE64 i konwertowana na tablicę bajtów.
//    Następnie, za pomocą klasy Keys z biblioteki JJWT, jest tworzony
//    klucz SHA-based HMAC (HMAC - Hash-based Message Authentication Code)
//    na podstawie bajtów klucza, który jest używany do weryfikacji podpisu tokenu JWT.
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
