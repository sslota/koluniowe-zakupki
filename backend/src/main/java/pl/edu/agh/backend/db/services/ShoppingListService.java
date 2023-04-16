package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
public class ShoppingListService {
    private final ProductRepository productRepository;
    private final ShoppingListRepository shoppingListRepository;
    private final ListProductRepository listProductRepository;



    public List<ShoppingList> getUserShoppingLists(Integer userId){ return shoppingListRepository.findByUserId(userId); }
    public List<Product> getUserShoppingListDetails(Integer listId){ return productRepository.findUserListProducts(listId); }
    public List<ShoppingList> getShoppingLists(){ return shoppingListRepository.findAll(); }
    public ShoppingList addShoppingList(ShoppingList shoppingList){ return shoppingListRepository.save(shoppingList); }

    public ListProduct addProductToList(ListProduct listProduct){ return listProductRepository.save(listProduct); }
    public Optional<ListProduct> removeProductFromList(ListProduct listProduct){
        Example<ListProduct> example = Example.of(listProduct);
        Optional<ListProduct> found = listProductRepository.findOne(example);
        found.ifPresent(listProductRepository::delete);
        return found;
    }

}
