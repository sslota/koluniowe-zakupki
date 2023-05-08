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
                                                   ListProductRepository listProductRepository,
                                                   SharedListRepository sharedListRepository) {
        return new ShoppingListService(productRepository, shoppingListRepository, listProductRepository, sharedListRepository);
    }

    @Bean
    public SocialsService socialsService(FriendshipRepository friendshipRepository,
                                         GroupRepository groupRepository,
                                         UserRepository userRepository) {
        return new SocialsService(friendshipRepository, groupRepository, userRepository);
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
