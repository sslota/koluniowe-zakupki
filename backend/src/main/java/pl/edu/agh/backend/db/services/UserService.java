package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getUsers(){ return userRepository.findAll(); }

}
