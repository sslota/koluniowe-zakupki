package pl.edu.agh.koluniowezakupki.db;

import pl.edu.agh.koluniowezakupki.models.User;

import java.util.List;

public class DatabaseService {
    private final DatabaseRepository databaseRepository;

    public DatabaseService(DatabaseRepository transactionRepository) {
        this.databaseRepository = transactionRepository;
    }

    public List<User> getUsers(){ return databaseRepository.findAll(); }

}
