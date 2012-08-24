package com.thoughtworks.twu.domain;

public class ResponseData {

    private Integer id;
    private Integer section_id;
    private String message;
    private String created_at;
    private String updated_at;
    private Integer votes_count;


    public Integer getVotes_count() {
        return votes_count;
    }

    public String getCreated_at() {
        return created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public Integer getSection_id() {
        return section_id;
    }

    public Integer getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

}
