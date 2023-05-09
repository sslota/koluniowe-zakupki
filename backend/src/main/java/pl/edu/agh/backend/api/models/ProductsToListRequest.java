package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.PositionOnList;

public record ProductsToListRequest(Integer listID, Integer productID, Integer quantity) {
    public PositionOnList createListProduct(){
        return PositionOnList.builder()
                .listID(listID)
                .productID(productID)
                .quantity(quantity)
                .build();
    }
}
