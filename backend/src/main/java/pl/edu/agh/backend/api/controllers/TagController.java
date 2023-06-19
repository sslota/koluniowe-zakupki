package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.api.models.CreateTagRequest;
import pl.edu.agh.backend.db.models.Tag;
import pl.edu.agh.backend.db.services.TagService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @GetMapping
    public List<Tag> getTagsAvailableForUser(@RequestParam Integer userID) {

        return tagService.getTagsAvailableForUser(userID);
    }

    @GetMapping("/product={productID}")
    public List<Tag> getTagsForProduct(@PathVariable Integer productID) {
        return tagService.getTagsForProduct(productID);
    }

    @GetMapping("/shop={shopID}")
    public List<Tag> getTagsForShop(@PathVariable Integer shopID){
        return tagService.getTagsForShop(shopID);
    }

    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody CreateTagRequest createTagRequest){
        Tag tag = tagService.addTag( createTagRequest.createTag());
        return new ResponseEntity<>(tag, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Object> removeTag(@RequestParam Integer tagID) {
        Optional<Tag> tag = tagService.removeTag(tagID);
        return tag.map(t -> new ResponseEntity<>(HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
