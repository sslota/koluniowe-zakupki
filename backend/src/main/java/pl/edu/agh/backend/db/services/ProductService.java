package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.models.records.ListPosition;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ListProductRepository listProductRepository;
    private final TagProductRepository tagProductRepository;

    public List<Product> getProductsAvailableForList(Integer userID, Integer listID) {
        List<Product> toChoose = productRepository.findUserAndDefaultProducts(userID);
        List<ListPosition> chosen = productRepository.findProductsiInList(listID);
        return toChoose.stream().filter(e -> {
            for (ListPosition lp : chosen) {
                if (e.getName().equals(lp.name())) return false;
            }
            return true;
        }).toList();
    }

    public List<Product> getUserProducts(Integer userID) {
        return productRepository.findUserProducts(userID);
    }

    public Product addProduct(Product product) {
        Example<Product> example = Example.of(product);
        Optional<Product> productInDb = productRepository.findOne(example);
        return productInDb.orElseGet(() -> productRepository.save(product));
    }

    public Product modifyProduct(Product product) {
        Optional<Product> productInDb = productRepository.findById(product.getID());
        Product modifiedProduct;
        if (productInDb.isPresent()) {
            modifiedProduct = productInDb.get();
            modifiedProduct.setName(product.getName());
            modifiedProduct.setUserID(product.getUserID());
            //open for future extensions
        } else modifiedProduct = new Product();

        return productRepository.save(modifiedProduct);
    }

    public Optional<Product> removeProduct(Integer productID) {
        Optional<Product> product = productRepository.findById(productID);
        if (product.isPresent()) {
            productRepository.deleteById(productID);
            listProductRepository.deleteWithProductId(productID);
            tagProductRepository.deleteWithProductId(productID);
        }
        return product;
    }

    public ProductTag addProductTag(ProductTag productTag) {
        Example<ProductTag> example = Example.of(productTag);
        Optional<ProductTag> tagProductInDb = tagProductRepository.findOne(example);
        return tagProductInDb.orElseGet(() -> tagProductRepository.save(productTag));
    }

}
