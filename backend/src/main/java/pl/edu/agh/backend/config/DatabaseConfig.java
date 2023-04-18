package pl.edu.agh.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.services.*;


@Configuration
public class DatabaseConfig {

    @Bean
    public ShoppingListService shoppingListService(ProductRepository productRepository,
                                               ShoppingListRepository shoppingListRepository,
                                               ListProductRepository listProductRepository) {
        return new ShoppingListService(productRepository, shoppingListRepository, listProductRepository);
    }

    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }

    @Bean
    public ProductService productService(ProductRepository productRepository) {
        return new ProductService(productRepository);
    }

    @Bean
    public ShopService shopService(ShopRepository shopRepository) {
        return new ShopService(shopRepository);
    }

}
