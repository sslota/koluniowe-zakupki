package pl.edu.agh.koluniowezakupki.api.models;

import pl.edu.agh.koluniowezakupki.db.models.Product;

public record CreateProductRequest(String name, Integer userID) {
    public Product createProduct(){
        return Product.builder()
                .name(name)
                .userID(userID)
                .build();
    }
}
