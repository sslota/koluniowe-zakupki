package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.Shop;

public record CreateShopRequest(String name, Integer userID, float latitude, float longitude) {
    public Shop createShop(){
        return Shop.builder()
                .name(name)
                .latitude(latitude)
                .longitude(longitude)
                .userID(userID)
                .build();
    }
}