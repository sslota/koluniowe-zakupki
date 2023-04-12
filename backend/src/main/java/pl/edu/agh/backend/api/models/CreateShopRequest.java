package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.Shop;

public record CreateShopRequest(String name, Integer userID) {
    public Shop createShop(){
        return Shop.builder()
                .name(name)
                .userID(userID)
                .build();
    }
}
