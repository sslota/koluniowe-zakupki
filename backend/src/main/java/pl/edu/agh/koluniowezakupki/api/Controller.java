package pl.edu.agh.koluniowezakupki.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.koluniowezakupki.api.models.*;
import pl.edu.agh.koluniowezakupki.db.DatabaseService;
import pl.edu.agh.koluniowezakupki.db.models.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/home")
public class Controller {
    private final DatabaseService databaseService;
    public Controller(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }


    @GetMapping("/users")
    public List<User> getUsers() {return databaseService.getUsers();}
    @GetMapping("/products")
    public List<Product> getProducts() {
        return databaseService.getProducts();
    }
    @GetMapping("/shops")
    public List<Shop> getShops() {return databaseService.getShops();}
    @GetMapping(value = {"/shoppingLists", "/shoppingLists/user={userId}"})
    public List<ShoppingList> getUserShoppingLists(@PathVariable(required = false) Integer userId) {
        if(userId==null) return databaseService.getShoppingLists();
        return databaseService.getUserShoppingLists(userId);
    }
    @GetMapping("/shoppingLists/list={listId}")
    public List<Product> getShoppingListDetails(@PathVariable Integer listId) {
        return databaseService.getUserShoppingListDetails(listId);
    }


    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest createUserRequest) {
        User user = databaseService.addUser( createUserRequest.createUser() );
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest createProductRequest) {
        Product product = databaseService.addProduct( createProductRequest.createProduct() );
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }
    @PostMapping("/shops")
    public ResponseEntity<Shop> createShop(@RequestBody CreateShopRequest createShopRequest) {
        Shop shop = databaseService.addShop( createShopRequest.createShop() );
        return new ResponseEntity<>(shop, HttpStatus.CREATED);
    }
    @PostMapping("/shoppingLists")
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody CreateShoppingListRequest createShoppingListRequest) {
        ShoppingList shoppingList = databaseService.addShoppingList( createShoppingListRequest.createShoppingList() );
        return new ResponseEntity<>(shoppingList, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ListProduct> putProductToList(@RequestParam Integer listID, @RequestParam Integer productID){
        ListProduct listProduct = databaseService.putProductToList( new ListProduct(listID, productID) );
        return new ResponseEntity<>(listProduct, HttpStatus.OK);
    }

}
