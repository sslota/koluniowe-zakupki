package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.ProductTag;
import pl.edu.agh.backend.db.models.Shop;
import pl.edu.agh.backend.db.models.ShopTag;
import pl.edu.agh.backend.db.models.Tag;

import java.util.List;

public record CreateShopRequest(String name, Integer userID, float latitude, float longitude, List<Tag> tags) {
    public Shop createShop(){
        return Shop.builder()
                .name(name)
                .latitude(latitude)
                .longitude(longitude)
                .userID(userID)
                .build();
    }
    public List<Tag> getTags(){
        return tags;
    }

    public ShopTag createShopTag(Integer shopID, Integer tagID){
        return ShopTag.builder()
                .shopID(shopID)
                .tagID(tagID)
                .build();
    }

}