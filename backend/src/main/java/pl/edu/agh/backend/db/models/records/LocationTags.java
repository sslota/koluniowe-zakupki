package pl.edu.agh.backend.db.models.records;

import pl.edu.agh.backend.db.models.Tag;

import java.util.List;

public record LocationTags(Location location, List<Tag> tagList, String shopName) {
}
