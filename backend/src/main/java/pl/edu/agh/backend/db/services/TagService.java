package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.models.Tag;
import pl.edu.agh.backend.db.ports.TagProductRepository;
import pl.edu.agh.backend.db.ports.TagRepository;
import pl.edu.agh.backend.db.ports.TagShopRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    private final TagProductRepository tagProductRepository;

    private final TagShopRepository tagShopRepository;

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

    public Tag addTag(Tag tag) {
        Example<Tag> example = Example.of(tag);
        Optional<Tag> tagInDb = tagRepository.findOne(example);
        return tagInDb.orElseGet(() -> tagRepository.save(tag));
    }

    public Optional<Tag> removeTag(Integer tagID) {
        Optional<Tag> tag = tagRepository.findById(tagID);
        if(tag.isPresent()){
            tagRepository.deleteById(tagID);
            tagProductRepository.deleteWithTagId(tagID);
            tagShopRepository.deleteWithTagId(tagID);
        }
        return tag;
    }
}
