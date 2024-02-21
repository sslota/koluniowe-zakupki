package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.api.models.*;
import pl.edu.agh.backend.db.services.ProductService;
import pl.edu.agh.backend.db.models.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getProductsAvailableToUser(@RequestParam Integer userID,
                                                    @RequestParam(required = false) Integer listID) {
        if(listID==null) return productService.getUserProducts(userID);
        return productService.getProductsAvailableForList(userID, listID);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest createProductRequest) {
        Product product = productService.addProduct( createProductRequest.createProduct() );
        createProductRequest.getTags().forEach(tag -> {
            productService.addProductTag(createProductRequest.createProductTag(product.getID(), tag.getID()));
        });
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product modifiedProduct = productService.modifyProduct( product );
        return new ResponseEntity<>(modifiedProduct, HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    public ResponseEntity<Object> removeProduct(@RequestParam Integer productID) {
        Optional<Product> product = productService.removeProduct(productID);
        return product.map(e -> new ResponseEntity<>(HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}