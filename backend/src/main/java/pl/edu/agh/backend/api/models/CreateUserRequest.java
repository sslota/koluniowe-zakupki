package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.User;

public record CreateUserRequest(String username, String password) {
    public User createUser(){
        return User.builder()
                .username(username)
                .password(password)
                .build();
    }
}
