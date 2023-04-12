package pl.edu.agh.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.DatabaseService;


@Configuration
public class DatabaseConfig {

    @Bean
    public DatabaseService databaseService(UserRepository userRepository,
                                           ShopRepository shopRepository,
                                           ProductRepository productRepository,
                                           ShoppingListRepository shoppingListRepository,
                                           ListProductRepository listProductRepository) {
        return new DatabaseService(userRepository, shopRepository, productRepository, shoppingListRepository, listProductRepository);
    }

}
