package pl.edu.agh.backend.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.api.models.*;
import pl.edu.agh.backend.db.services.ShoppingListService;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/shopping-lists")
public class ShoppingListController {
    private final ShoppingListService shoppingListService;
    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }


    @GetMapping( value = {"", "/shopping-lists/user={userId}"})
    public List<ShoppingList> getUserShoppingLists(@PathVariable(required = false) Integer userId) {
        if(userId==null) return shoppingListService.getShoppingLists();
        return shoppingListService.getUserShoppingLists(userId);
    }
    @GetMapping("/list={listId}")
    public List<Product> getShoppingListDetails(@PathVariable Integer listId) {
        return shoppingListService.getUserShoppingListDetails(listId);
    }



    @PostMapping
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody CreateShoppingListRequest createShoppingListRequest) {
        ShoppingList shoppingList = shoppingListService.addShoppingList( createShoppingListRequest.createShoppingList() );
        return new ResponseEntity<>(shoppingList, HttpStatus.CREATED);
    }
    @PostMapping("/add")
    public ResponseEntity<ListProduct> addProductToList(@RequestParam Integer listID, @RequestParam Integer productID){
        ListProduct listProduct = shoppingListService.addProductToList( ListProduct.builder().listID(listID).productID(productID).build() );
        return new ResponseEntity<>(listProduct, HttpStatus.OK);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<ListProduct> removeProductFromList(@RequestParam Integer listID, @RequestParam Integer productID){
        Optional<ListProduct> listProduct =  shoppingListService.removeProductFromList( ListProduct.builder().listID(listID).productID(productID).build() );
        return listProduct.map(product -> new ResponseEntity<>(product, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
