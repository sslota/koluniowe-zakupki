package pl.edu.agh.koluniowezakupki.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.koluniowezakupki.db.ports.ShoppingListRepository;
import pl.edu.agh.koluniowezakupki.db.ports.ProductRepository;
import pl.edu.agh.koluniowezakupki.db.ports.ShopRepository;
import pl.edu.agh.koluniowezakupki.db.ports.UserRepository;
import pl.edu.agh.koluniowezakupki.db.DatabaseService;


@Configuration
public class DatabaseConfig {

    @Bean
    public DatabaseService databaseService(UserRepository userRepository,
                                           ShopRepository shopRepository,
                                           ProductRepository productRepository,
                                           ShoppingListRepository shoppingListRepository) {
        return new DatabaseService(userRepository, shopRepository, productRepository, shoppingListRepository);
    }

}
