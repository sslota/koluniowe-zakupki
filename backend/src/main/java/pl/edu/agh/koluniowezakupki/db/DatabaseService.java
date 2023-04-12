package pl.edu.agh.koluniowezakupki.db;

import lombok.AllArgsConstructor;
import pl.edu.agh.koluniowezakupki.db.ports.*;
import pl.edu.agh.koluniowezakupki.db.models.*;

import java.util.List;


@AllArgsConstructor
public class DatabaseService {
    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final ShoppingListRepository shoppingListRepository;
    private final ListProductRepository listProductRepository;


    public List<User> getUsers(){ return userRepository.findAll(); }
    public User addUser(User user){ return userRepository.save(user); }

    public List<Shop> getShops(){ return shopRepository.findAll(); }
    public Shop addShop(Shop shop){ return shopRepository.save(shop); }

    public List<Product> getProducts(){ return productRepository.findAll(); }
    public Product addProduct(Product product){ return productRepository.save(product); }

    public List<ShoppingList> getUserShoppingLists(Integer userId){ return shoppingListRepository.findByUserId(userId); }
    public List<Product> getUserShoppingListDetails(Integer listId){ return productRepository.findUserListProducts(listId); }
    public List<ShoppingList> getShoppingLists(){ return shoppingListRepository.findAll(); }
    public ShoppingList addShoppingList(ShoppingList shoppingList){ return shoppingListRepository.save(shoppingList); }

    public ListProduct putProductToList(ListProduct listProduct){ return listProductRepository.save(listProduct); }

}
