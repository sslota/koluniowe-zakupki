package pl.edu.agh.backend.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.api.models.*;
import pl.edu.agh.backend.db.services.ProductService;
import pl.edu.agh.backend.db.services.ShoppingListService;
import pl.edu.agh.backend.db.models.*;


import java.util.List;

@RestController
@RequestMapping(path = "/products")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest createProductRequest) {
        Product product = productService.addProduct( createProductRequest.createProduct() );
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

}