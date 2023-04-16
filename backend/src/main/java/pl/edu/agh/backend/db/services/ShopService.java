package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;


@AllArgsConstructor
public class ShopService {
    private final ShopRepository shopRepository;


    public List<Shop> getShops(){ return shopRepository.findAll(); }
    public Shop addShop(Shop shop){ return shopRepository.save(shop); }

}
