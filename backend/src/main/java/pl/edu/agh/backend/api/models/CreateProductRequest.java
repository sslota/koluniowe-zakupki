package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.Product;

public record CreateProductRequest(String name, Integer userID) {
    public Product createProduct(){
        return Product.builder()
                .name(name)
                .userID(userID)
                .build();
    }
}
