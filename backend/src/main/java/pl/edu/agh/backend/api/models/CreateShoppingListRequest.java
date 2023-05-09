package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.ShoppingList;

public record CreateShoppingListRequest(String name, Integer userID) {
    public ShoppingList createShoppingList(){
        return ShoppingList.builder()
                .name(name)
                .userID(userID)
                .build();
    }
}
