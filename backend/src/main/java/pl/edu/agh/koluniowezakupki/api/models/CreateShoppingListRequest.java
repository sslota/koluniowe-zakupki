package pl.edu.agh.koluniowezakupki.api.models;

import pl.edu.agh.koluniowezakupki.db.models.ShoppingList;

public record CreateShoppingListRequest(String name, Integer userID) {
    public ShoppingList createShoppingList(){
        return ShoppingList.builder()
                .name(name)
                .userID(userID)
                .build();
    }
}
