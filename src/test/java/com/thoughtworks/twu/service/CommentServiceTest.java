package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.persistence.ICommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CommentServiceTest {
    CommentService commentService;
    private ICommentMapper mockMapper;

    @Before
    public void setUp(){
        SqlSessionFactory mockSqlSessionFactory=mock(SqlSessionFactory.class);
        SqlSession mockSession=mock(SqlSession.class);
        mockMapper=mock(ICommentMapper.class);
        when(mockSession.getMapper(ICommentMapper.class)).thenReturn(mockMapper);
        when(mockSqlSessionFactory.openSession(true)).thenReturn(mockSession);
        this.commentService = new CommentService(mockSqlSessionFactory);
    }

    @Test
    public void shouldAddNewCommentInDatabase(){

        Comment comment = commentService.addNewComment(1, "mib","AddNewComment");

        verify(mockMapper).insertComment(comment);
    }

    @Test(expected = RuntimeException.class)
    public void  shouldNotInsertTheCommentIfMessageIsAEmptyString(){
        commentService.addNewComment(1, "PersonName", "");
    }

    @Test
    public void shouldInsertCommentWithNameAsAnonymousIfNameIsEmptyString(){
        Comment comment = commentService.addNewComment(1, "","EmptyName");
        assertEquals("anonymous",comment.name);
    }

    @Test (expected = RuntimeException.class)
    public void shouldThrowExceptionIfBoardIdIsNull(){
        commentService.addNewComment(null, "", "Board ID Null");
    }

    @Test
    public void shouldReturnTotalNumberOfCommentsForABoard(){
        int boardID = 99;
        int commentNum = 1;
        when(mockMapper.getCommentCount(boardID)).thenReturn(commentNum);

        Integer numberOfComments=commentService.getCommentsCount(boardID);

        assertEquals(commentNum, numberOfComments.intValue());
    }


    @Test
    public void shouldDeleteAllCommentsForABoard(){
        int boardID = 9;
        commentService.deleteComments(boardID);
        verify(mockMapper).deleteComments(boardID);
    }

    @Test
    public void shouldGetCommentsForOneIdeaboard(){
        int boardID = 1;
        commentService.getAllComments(boardID);
        verify(mockMapper).getAllComments(boardID);
    }
}


