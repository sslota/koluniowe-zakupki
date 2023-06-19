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
                                         ListProductRepository listProductRepository, TagProductRepository tagProductRepository) {
        return new ProductService(productRepository, listProductRepository, tagProductRepository);
    }

    @Bean
    public ShopService shopService(ShopRepository shopRepository, TagShopRepository tagShopRepository) {
        return new ShopService(shopRepository, tagShopRepository);
    }

    @Bean
    public TagService tagService(TagRepository tagRepository, TagProductRepository tagProductRepository, TagShopRepository tagShopRepository) {
        return new TagService(tagRepository, tagProductRepository, tagShopRepository);
    }

    @Bean
    public RoutingService routingService(ShopService shopService, TagService tagService) {
        return new RoutingService(shopService, tagService);
    }

}
