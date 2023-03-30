package pl.edu.agh.koluniowezakupki.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.koluniowezakupki.db.DatabaseService;
import pl.edu.agh.koluniowezakupki.models.User;

import java.util.List;

@RestController
public class Controller {
    private final DatabaseService databaseService;
    public Controller(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @GetMapping("/home")
    public List<User> getUsers() {
        return databaseService.getUsers();
    }

}
