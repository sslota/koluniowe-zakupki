package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.Shop;

public record CreateShopRequest(String name, Integer userID, String location) {
    public Shop createShop(){
        return Shop.builder()
                .name(name)
                .location(location)
                .userID(userID)
                .build();
    }
}
