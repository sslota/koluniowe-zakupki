package pl.edu.agh.koluniowezakupki.api.models;

import pl.edu.agh.koluniowezakupki.db.models.User;

public record CreateUserRequest(String username, String password) {
    public User createUser(){
        return User.builder()
                .username(username)
                .password(password)
                .build();
    }
}
