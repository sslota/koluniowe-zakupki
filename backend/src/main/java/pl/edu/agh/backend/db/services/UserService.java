package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;

@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getUsers(){ return userRepository.findAll(); }
    public User addUser(User user){ return userRepository.save(user); }

}
