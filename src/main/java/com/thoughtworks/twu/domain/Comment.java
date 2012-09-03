package com.thoughtworks.twu.domain;

import java.util.Date;


public class Comment  {
    public String name;
    public String comment;
    public int id;
    private Date createdAt;

    public Comment(String name, String comment) {

        this.name = name;
        this.comment = comment;
        this.createdAt = new Date();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Comment comment1 = (Comment) o;

        if (id != comment1.id) return false;
        if (comment != null ? !comment.equals(comment1.comment) : comment1.comment != null) return false;
        //if (createdAt != null ? !createdAt.equals(comment1.createdAt) : comment1.createdAt != null) return false;
        if (name != null ? !name.equals(comment1.name) : comment1.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (comment != null ? comment.hashCode() : 0);
        result = 31 * result + id;
        result = 31 * result + (createdAt != null ? createdAt.hashCode() : 0);
        return result;
    }
}
