package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class ShoppingListController {
    private final ShoppingListService shoppingListService;

    @GetMapping( value = {"", "/user={userID}"})
    public List<ShoppingList> getUserShoppingLists(@PathVariable(required = false) Integer userID) {
        if(userID==null) return shoppingListService.getShoppingLists();
        return shoppingListService.getUserShoppingLists(userID);
    }
    @GetMapping("/list={listID}")
    public List<ListPosition> getShoppingListDetails(@PathVariable Integer listID) {
        return shoppingListService.getShoppingListDetails(listID);
    }

    @PostMapping
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody CreateShoppingListRequest createShoppingListRequest) {
        ShoppingList shoppingList = shoppingListService.addShoppingList( createShoppingListRequest.createShoppingList() );
        return new ResponseEntity<>(shoppingList, HttpStatus.CREATED);
    }
    @PostMapping("/add")
    public ResponseEntity<ListProduct> addPositionToList(@RequestBody ProductsToListRequest addProductsToListRequest){
        ListProduct listProduct = shoppingListService.addPositionToList( addProductsToListRequest.createListProduct() );
        return new ResponseEntity<>(listProduct, HttpStatus.OK);
    }
    @PostMapping("/share")
    public ResponseEntity<SharedList> shareListToUser(@RequestBody ShareListRequest shareListRequest){
        SharedList shareList = shoppingListService.shareList(shareListRequest.createShareList());
        return new ResponseEntity<>(shareList, HttpStatus.OK);
    }

    @PutMapping("/update-quantity")
    public ResponseEntity<ListProduct> changeProductQuantityInList(@RequestBody ProductsToListRequest updateQuantityRequest){
        ListProduct updatedPosition = shoppingListService.changeProductQuantity(updateQuantityRequest.createListProduct());
        return new ResponseEntity<>(updatedPosition, HttpStatus.OK);
    }

    @DeleteMapping("/remove-product-from-list")
    public ResponseEntity<Object> removeProductFromList(@RequestParam Integer listID, @RequestParam Integer productID){
        Optional<ListProduct> listProduct =  shoppingListService.removeProductFromList( ListProduct.builder().listID(listID).productID(productID).build() );
        return listProduct.map(e -> new ResponseEntity<>(HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/remove-list")
    public ResponseEntity<Object> removeList(@RequestParam Integer listID){
        Optional<ShoppingList> shoppingList =  shoppingListService.removeList(listID);
        return shoppingList.map(e -> new ResponseEntity<>(HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
