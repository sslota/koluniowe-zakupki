package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.ListProduct;

public record ProductsToListRequest(Integer listID, Integer productID, Integer quantity) {
    public ListProduct createListProduct(){
        return ListProduct.builder()
                .listID(listID)
                .productID(productID)
                .quantity(quantity)
                .build();
    }
}
