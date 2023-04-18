package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.db.services.UserService;
import pl.edu.agh.backend.db.models.*;


import java.util.List;

@RestController
@RequestMapping(path = "/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> getUsers() {return userService.getUsers();}

}
