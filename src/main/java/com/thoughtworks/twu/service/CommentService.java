package com.thoughtworks.twu.service;
import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.persistence.ICommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class CommentService implements ICommentService{
    private ICommentMapper commentMapper;
    private SqlSessionFactory sqlSessionFactory;
    private SqlSession session;
    public CommentService(){
        this.sqlSessionFactory = MyBatisConnectionFactory.getSqlSessionFactory();
        this.session = sqlSessionFactory.openSession(true);
    }


    @Override
    public Comment addNewComment(Integer boardID, String name, String comment) {
        try {

            if(boardID==null)
                throw new RuntimeException("Select a valid Ideaboard");

            if(comment.isEmpty())
                throw new RuntimeException("Please Enter a message");

            if(name.isEmpty())
                name="anonymous";

//            commentMapper = session.getMapper(ICommentMapper.class);
            Comment newComment = new Comment(boardID, name, comment);
//            commentMapper.insertComment(newComment);
//            Comment savedComment = commentMapper.selectComment(newComment);
//            return savedComment;
              return newComment;
        } finally {
//            session.commit(true);
//            session.close();
        }

    }
}
