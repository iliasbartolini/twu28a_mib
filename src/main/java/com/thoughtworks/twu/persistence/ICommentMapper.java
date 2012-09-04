package com.thoughtworks.twu.persistence;

import com.thoughtworks.twu.domain.Comment;
import org.apache.ibatis.annotations.Insert;


public interface ICommentMapper {
    @Insert("INSERT INTO comments (name,comment) VALUES(#{name}, #{comment})")
    public Comment insertComment(Comment newComment);
}
