package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
public class ShoppingListService {
    private final ProductRepository productRepository;
    private final ShoppingListRepository shoppingListRepository;
    private final ListProductRepository listProductRepository;


    public List<ShoppingList> getUserShoppingLists(Integer userID){ return shoppingListRepository.findByUserId(userID); }
    public List<Product> getUserShoppingListDetails(Integer listID){ return productRepository.findUserListProducts(listID); }
    public List<ShoppingList> getShoppingLists(){ return shoppingListRepository.findAll(); }
    public ShoppingList addShoppingList(ShoppingList shoppingList){ return shoppingListRepository.save(shoppingList); }

    public ListProduct addPositionToList(ListProduct listProduct){ return listProductRepository.save(listProduct); }
    public ListProduct changeProductQuantity(ListProduct updateQuantityRequest){
        Example<ListProduct> example = Example.of(ListProduct.builder().listID(updateQuantityRequest.getListID()).productID(updateQuantityRequest.getProductID()).build());
        Optional<ListProduct> position = listProductRepository.findOne(example);
        ListProduct updatedPosition;
        if(position.isPresent()){
            updatedPosition=position.get();
            updatedPosition.setQuantity(updateQuantityRequest.getQuantity());
        }
        else updatedPosition = updateQuantityRequest;
        return listProductRepository.save(updatedPosition);
    }
    public Optional<ListProduct> removeProductFromList(ListProduct listProduct){
        Example<ListProduct> example = Example.of(listProduct);
        Optional<ListProduct> product = listProductRepository.findOne(example);
        product.ifPresent(listProductRepository::delete);
        return product;
    }
    public Optional<ShoppingList> removeList(Integer listID){
        Optional<ShoppingList> list = shoppingListRepository.findById(listID);
        if(list.isPresent()){
            shoppingListRepository.deleteById(listID);
            listProductRepository.deleteWithListId(listID);
        }
        return list;
    }

}
