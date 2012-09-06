package com.thoughtworks.twu.persistence;

import com.thoughtworks.twu.domain.Comment;
import org.apache.ibatis.annotations.*;

import java.util.List;


public interface ICommentMapper {

    @Insert("INSERT INTO comments (boardID,name,comment,createdAt) VALUES(#{boardID},#{name}, #{comment},#{createdAt})")
    public void insertComment(Comment newComment);

    @Select("SELECT * FROM comments WHERE name=#{name} AND comment=#{comment} AND createdAt=#{createdAt}")
    public Comment selectComment(Comment savedComment);

    @Delete("DELETE from comments where boardID=#{boardID}")
    public void deleteComments(Integer boardID);

    @Select("SELECT count(*) from comments where boardID=#{boardID}")
    public Integer getCommentCount(Integer boardID);

    @Select("Select * from comments where boardID=#{boardID}")
    public List<Comment> getAllComments(Integer boardID);
}
