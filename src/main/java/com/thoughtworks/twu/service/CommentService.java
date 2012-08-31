package com.thoughtworks.twu.service;
import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.persistence.ICommentMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class CommentService implements ICommentService{
    ICommentMapper commentMapper ;

    @Autowired
    public CommentService(ICommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }
    @Override

    public Comment addNewComment(String name, String comment) {
        Comment savedComment = commentMapper.insertComment(new Comment(name,comment));
        return savedComment;
    }
}
