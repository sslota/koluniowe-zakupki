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
    public SocialsService socialsService(FriendRepository friendRepository,
                                         GroupRepository groupRepository,
                                         UserRepository userRepository) {
        return new SocialsService(friendRepository, groupRepository, userRepository);
    }

    @Bean
    public ProductService productService(ProductRepository productRepository,
                                         ListProductRepository listProductService) {
        return new ProductService(productRepository, listProductService);
    }

    @Bean
    public ShopService shopService(ShopRepository shopRepository) {
        return new ShopService(shopRepository);
    }

}
