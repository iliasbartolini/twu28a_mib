package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CommentServiceTest {

    @Test
    public void shouldAddNewCommentInDatabase(){
        CommentService commentService = new CommentService();
        Comment comment = commentService.addNewComment(1, "mib","hello ideaboardz");
        assertEquals("mib",comment.name);
    }

    @Test(expected = RuntimeException.class)
    public void  shouldNotInsertTheCommentIfMessageIsAEmptyString(){
        CommentService commentService = new CommentService();
        Comment comment = commentService.addNewComment(1, "mib","");
    }

    @Test
    public void shouldInsertCommentWithNameAsAnonymousIfNameIsEmptyString(){
        CommentService commentService = new CommentService();
        Comment comment = commentService.addNewComment(1, "","hello ideaboardz");
        assertEquals("anonymous",comment.name);
    }

    @Test (expected = RuntimeException.class)
    public void shouldThrowExceptionIfBoardIdIsNull(){
        CommentService commentService = new CommentService();
        Comment comment = commentService.addNewComment(null, "","hello ideaboardz");
    }

}


