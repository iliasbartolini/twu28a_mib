package com.thoughtworks.twu.persistence;

import com.thoughtworks.twu.domain.Comment;
import org.apache.ibatis.annotations.*;


public interface ICommentMapper {
    @Insert("INSERT INTO comments (boardID,name,comment,createdAt) VALUES(#{boardID},#{name}, #{comment},#{createdAt})")
    public void insertComment(Comment newComment);

    @Select("SELECT * FROM comments WHERE name=#{name} AND comment=#{comment} AND createdAt=#{createdAt}")

    public Comment selectComment(Comment savedComment);

}
