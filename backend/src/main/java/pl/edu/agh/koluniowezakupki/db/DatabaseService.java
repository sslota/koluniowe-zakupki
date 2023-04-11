package pl.edu.agh.koluniowezakupki.db;

import pl.edu.agh.koluniowezakupki.db.ports.*;
import pl.edu.agh.koluniowezakupki.db.models.*;

import java.util.List;
import java.util.Optional;

public class DatabaseService {
    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final ShoppingListRepository shoppingListRepository;

    public DatabaseService(UserRepository userRepository, ShopRepository shopRepository, ProductRepository productRepository, ShoppingListRepository shoppingListRepository) {
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
        this.productRepository = productRepository;
        this.shoppingListRepository = shoppingListRepository;
    }

    public List<User> getUsers(){ return userRepository.findAll(); }
    public User addUser(User user){ return userRepository.save(user); }

    public List<Shop> getShops(){ return shopRepository.findAll(); }
    public Shop addShop(Shop shop){ return shopRepository.save(shop); }

    public List<Product> getProducts(){ return productRepository.findAll(); }
    public Product addProduct(Product product){ return productRepository.save(product); }

    public Optional<ShoppingList> getShoppingList(Integer id){ return shoppingListRepository.findById( id ); }
    public ShoppingList addShoppingList(ShoppingList shoppingList){ return shoppingListRepository.save(shoppingList); }

}
