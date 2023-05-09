package pl.edu.agh.backend.api.models;

import pl.edu.agh.backend.db.models.SharedList;

public record ShareListRequest(Integer listID, Integer userID) {
    public SharedList createShareList(){
        return SharedList.builder()
                .listID(listID)
                .userID(userID)
                .build();
    }
}
