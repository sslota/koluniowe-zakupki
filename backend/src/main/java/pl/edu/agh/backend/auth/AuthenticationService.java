package pl.edu.agh.backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.agh.backend.auth.models.AuthenticationRequest;
import pl.edu.agh.backend.auth.models.AuthenticationResponse;
import pl.edu.agh.backend.auth.models.RegisterRequest;
import pl.edu.agh.backend.config.JwtService;
import pl.edu.agh.backend.db.models.Role;
import pl.edu.agh.backend.db.models.User;
import pl.edu.agh.backend.db.ports.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Optional<AuthenticationResponse> register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        if (addUser(user).isPresent()) {
            var jwtToken = jwtService.generateToken(user);
            return Optional.of(AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build());
        }
        else return Optional.empty();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private Optional<User> addUser(User user){
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent()) return Optional.empty();
        else return Optional.of(userRepository.save(user));
    }

}
