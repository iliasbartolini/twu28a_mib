package com.thoughtworks.twu.domain;

import java.util.Date;


public class Comment  {
    public String name;
    public String comment;
    public Integer commentID;
    public Date createdAt;
    public Integer boardID;

    public Comment(){

    }

    public Comment(Integer boardID, String name, String comment) {
        this.boardID=boardID;
        this.name = name;
        this.comment = comment;
        this.createdAt = new Date();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Comment comment1 = (Comment) o;

        if (comment != null ? !comment.equals(comment1.comment) : comment1.comment != null) return false;
        if (name != null ? !name.equals(comment1.name) : comment1.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (comment != null ? comment.hashCode() : 0);
        result = 31 * result + commentID;
        result = 31 * result + (createdAt != null ? createdAt.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", commentID=" + commentID +
                ", createdAt=" + createdAt +
                '}';
    }

    public String toJSON(){
        return String.format("{\"board_id\":%d,\"comment_id\": %d,\"name\":\"%s\",\"comment\":\"%s\",\"created_at\":\"%s\"}",
                this.boardID,this.commentID, this.name, this.comment, this.createdAt.getTime())  ;
    }
}
