package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.Tag;

public record CreateTagRequest(String name, Integer userID){

    public Tag createTag(){
        return Tag.builder()
                .name(name)
                .userID(userID)
                .build();
    }

}
