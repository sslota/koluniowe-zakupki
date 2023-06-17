package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.db.models.Tag;
import pl.edu.agh.backend.db.services.TagService;

import java.util.List;

@RestController
@RequestMapping(path = "/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.getTags();
    }

    @GetMapping("/product={productID}")
    public List<Tag> getTagsForProduct(@PathVariable Integer productID) {
        return tagService.getTagsForProduct(productID);
    }

    @GetMapping("/shop={shopID}")
    public List<Tag> getTagsForShop(@PathVariable Integer shopID){
        return tagService.getTagsForShop(shopID);
    }

}
