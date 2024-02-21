package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.api.models.*;
import pl.edu.agh.backend.db.services.ShopService;
import pl.edu.agh.backend.db.models.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/shops")
@RequiredArgsConstructor
public class ShopController {
    private final ShopService shopService;


    @GetMapping
    public List<Shop> getShops() {return shopService.getShops();}

    @GetMapping("/userID={userID}")
    public List<Shop> getUserShops(@PathVariable Integer userID) {
        return shopService.getUserShops(userID);
    }

    @PostMapping
    public ResponseEntity<Shop> createShop(@RequestBody CreateShopRequest createShopRequest) {
        Shop shop = shopService.addShop( createShopRequest.createShop() );
        createShopRequest.getTags().forEach(tag -> {
            shopService.addShopTag(createShopRequest.createShopTag(shop.getID(), tag.getID()));
        });
        return new ResponseEntity<>(shop, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Shop> updateShop(@RequestBody Shop shop) {
        Shop modifiedShop = shopService.modifyShop(shop);
        return new ResponseEntity<>(modifiedShop, HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    public ResponseEntity<Object> removeShop(@RequestParam Integer shopID) {
        Optional<Shop> shop = shopService.removeShop(shopID);
        return shop.map(e -> new ResponseEntity<>(HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}