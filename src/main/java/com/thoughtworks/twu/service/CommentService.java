package com.thoughtworks.twu.service;
import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.persistence.ICommentMapper;

public class CommentService implements ICommentService{
    private ICommentMapper iCommentMapper;

    public CommentService(ICommentMapper iCommentMapper)
    {
        this.iCommentMapper = iCommentMapper;
    }

    @Override
    public Comment addNewComment(String name, String comment) {
        Comment savedComment = iCommentMapper.insertComment(new Comment(name,comment));
        return savedComment;
    }
}
