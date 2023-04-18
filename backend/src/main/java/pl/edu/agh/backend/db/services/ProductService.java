package pl.edu.agh.backend.db.services;

import lombok.AllArgsConstructor;
import pl.edu.agh.backend.db.ports.*;
import pl.edu.agh.backend.db.models.*;

import java.util.List;

@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getProducts(){ return productRepository.findAll(); }
    public Product addProduct(Product product){ return productRepository.save(product); }

}
