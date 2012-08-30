package com.thoughtworks.twu.service;
import com.thoughtworks.twu.domain.Comment;

public class CommentService implements ICommentService{
    @Override
    public Comment addNewComment(String name, String comment) {
        return new Comment(name,comment);
    }
}
