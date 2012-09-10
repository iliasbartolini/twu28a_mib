package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.persistence.ICommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class CommentService implements ICommentService {
    private ICommentMapper commentMapper;

    public CommentService() {
        this(MyBatisConnectionFactory.getSqlSessionFactory());
    }

    public CommentService(SqlSessionFactory sqlSessionFactory) {
        SqlSession session = sqlSessionFactory.openSession(true);
        commentMapper = session.getMapper(ICommentMapper.class);
    }


    @Override
    public Comment addNewComment(Integer boardID, String name, String comment) {
        if (boardID == null)
            throw new RuntimeException("Select a valid Ideaboard");

        if (comment.isEmpty())
            throw new RuntimeException("Please Enter a message");

        if (name.isEmpty())
            name = "anonymous";

        Comment newComment = new Comment(boardID, name, comment);

        commentMapper.insertComment(newComment);

        return newComment;
    }

    @Override
    public void deleteComments(Integer boardID) {
        commentMapper.deleteComments(boardID);
    }

    @Override
    public Integer getCommentsCount(Integer boardID) {
        return commentMapper.getCommentCount(boardID);
    }

    @Override
    public List<Comment> getAllComments(Integer boardID) {
        return commentMapper.getAllComments(boardID);
    }
}
