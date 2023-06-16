package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class ShopService {
    private final ShopRepository shopRepository;

    public List<Shop> getShops(){ return shopRepository.findAll(); }
    public Shop addShop(Shop shop){
        Example<Shop> example = Example.of(shop);
        Optional<Shop> shopInDb = shopRepository.findOne(example);
        return shopInDb.orElseGet(() -> shopRepository.save(shop));
    }
    public Shop modifyShop(Shop shop){
        Optional<Shop> shopInDb = shopRepository.findById(shop.getID());
        Shop modifiedShop;
        if(shopInDb.isPresent()){
            modifiedShop = shopInDb.get();
            modifiedShop.setName(shop.getName());
            modifiedShop.setLatitude(shop.getLatitude());
            modifiedShop.setLongitude(shop.getLongitude());
            modifiedShop.setUserID(shop.getUserID());
            //open for future extensions
        }
        else modifiedShop = new Shop();

        return shopRepository.save(modifiedShop);
    }

    public Optional<Shop> removeShop(Integer shopID) {
        Optional<Shop> shop = shopRepository.findById(shopID);
        if(shop.isPresent()){
            shopRepository.deleteById(shopID);
        }
        return shop;
    }

}