package pl.edu.agh.koluniowezakupki.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.koluniowezakupki.db.DatabaseRepository;
import pl.edu.agh.koluniowezakupki.db.DatabaseService;


@Configuration
public class DatabaseConfig {

    @Bean
    public DatabaseService transactionService(DatabaseRepository databaseRepository) {
        return new DatabaseService(databaseRepository);
    }

}
