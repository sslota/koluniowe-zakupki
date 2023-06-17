package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import pl.edu.agh.backend.db.models.Tag;
import pl.edu.agh.backend.db.ports.TagRepository;

import java.util.List;
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    public List<Tag> getTagsForProduct(Integer productID){
        return tagRepository.findTagsForProduct(productID);
    }


    public List<Tag> getTagsForShop(Integer shopID) {
        return tagRepository.findTagsForShop(shopID);
    }

    public List<Tag> getTagsForList(Integer listID) {
        return tagRepository.findTagsForList(listID);
    }
}
