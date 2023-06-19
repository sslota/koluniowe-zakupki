package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.Product;
import pl.edu.agh.backend.db.models.ProductTag;
import pl.edu.agh.backend.db.models.Tag;

import java.util.List;

public record CreateProductRequest(String name, Integer userID, List<Tag> tags) {
    public Product createProduct(){
        return Product.builder()
                .name(name)
                .userID(userID)
                .build();
    }

    public List<Tag> getTags(){
        return tags;
    }

    public ProductTag createProductTag(Integer productID, Integer tagID){
        return ProductTag.builder()
                .productID(productID)
                .tagID(tagID)
                .build();
    }
}
