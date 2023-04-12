package pl.edu.agh.koluniowezakupki.api.models;

import pl.edu.agh.koluniowezakupki.db.models.Shop;

public record CreateShopRequest(String name, Integer userID) {
    public Shop createShop(){
        return Shop.builder()
                .name(name)
                .userID(userID)
                .build();
    }
}
