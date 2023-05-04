package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class ShopService {
    private final ShopRepository shopRepository;

    public List<Shop> getShops(){ return shopRepository.findAll(); }
    public Shop addShop(Shop shop){ return shopRepository.save(shop); }
    public Shop modifyShop(Shop shop){
        Optional<Shop> shopInDb = shopRepository.findById(shop.getID());
        Shop modifiedShop;
        if(shopInDb.isPresent()){
            modifiedShop = shopInDb.get();
            modifiedShop.setName(shop.getName());
            modifiedShop.setUserID(shop.getUserID());
            //open for future extensions
        }
        else modifiedShop = new Shop();

        return shopRepository.save(modifiedShop);
    }

    public Optional<Shop> removeShop(Integer shopId) {
        Optional<Shop> shop = shopRepository.findById(shopId);
        if(shop.isPresent()){
            shopRepository.deleteById(shopId);
        }
        return shop;
    }

}
