package pl.edu.agh.backend.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.api.models.*;
import pl.edu.agh.backend.db.services.ShopService;
import pl.edu.agh.backend.db.models.*;


import java.util.List;

@RestController
@RequestMapping(path = "/shops")
public class ShopController {
    private final ShopService shopService;
    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping
    public List<Shop> getShops() {return shopService.getShops();}

    @PostMapping
    public ResponseEntity<Shop> createShop(@RequestBody CreateShopRequest createShopRequest) {
        Shop shop = shopService.addShop( createShopRequest.createShop() );
        return new ResponseEntity<>(shop, HttpStatus.CREATED);
    }

}
