package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.models.records.ListPosition;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
public class ShoppingListService {
    private final ProductRepository productRepository;
    private final ShoppingListRepository shoppingListRepository;
    private final ListProductRepository listProductRepository;
    private final SharedListRepository sharedListRepository;


    public List<ShoppingList> getUserShoppingLists(Integer userID){ return shoppingListRepository.findByUserId(userID); }
    public List<ListPosition> getShoppingListDetails(Integer listID){ return productRepository.findProductsiInList(listID); }
    public List<ShoppingList> getShoppingLists(){ return shoppingListRepository.findAll(); }
    public ShoppingList addShoppingList(ShoppingList shoppingList){
        Example<ShoppingList> example = Example.of(shoppingList);
        Optional<ShoppingList> shoppingListInDb = shoppingListRepository.findOne(example);
        return shoppingListInDb.orElseGet(() -> shoppingListRepository.save(shoppingList));
    }
    public SharedList shareList(SharedList sharedList) {
        Example<SharedList> example = Example.of(sharedList);
        Optional<SharedList> sharedListInDb = sharedListRepository.findOne(example);
        return sharedListInDb.orElseGet(() -> sharedListRepository.save(sharedList));
    }
    public PositionOnList addPositionToList(PositionOnList positionOnList){
        Example<PositionOnList> example = Example.of(positionOnList);
        Optional<PositionOnList> listProductInDb = listProductRepository.findOne(example);
        return listProductInDb.orElseGet(() -> listProductRepository.save(positionOnList));
    }
    public PositionOnList changeProductQuantity(PositionOnList updateQuantityRequest){
        Example<PositionOnList> example = Example.of(PositionOnList.builder().listID(updateQuantityRequest.getListID()).productID(updateQuantityRequest.getProductID()).build());
        Optional<PositionOnList> position = listProductRepository.findOne(example);
        PositionOnList updatedPosition;
        if(position.isPresent()){
            updatedPosition=position.get();
            updatedPosition.setQuantity(updateQuantityRequest.getQuantity());
        }
        else updatedPosition = updateQuantityRequest;
        return listProductRepository.save(updatedPosition);
    }
    public Optional<PositionOnList> removeProductFromList(PositionOnList positionOnList){
        Example<PositionOnList> example = Example.of(positionOnList);
        Optional<PositionOnList> product = listProductRepository.findOne(example);
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
