package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.service.ICommentService;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CommentControllerTest {
    CommentController commentController;
    ICommentService mockedCommentService;

    @Before
    public void setUp(){
        mockedCommentService = mock(ICommentService.class);
        commentController = new CommentController(mockedCommentService);
    }

    @Test
    public void shouldReturnTheMostRecentCommentAdded() {
        Comment savedComment = new Comment(10, "anoop", "hello");
        savedComment.commentID = 10;
        when(mockedCommentService.addNewComment(10, "anoop","hello")).thenReturn(savedComment);

        String savedCommentResult = commentController.createComment(10, "anoop", "hello");

        assertEquals(savedComment.toJSON(), savedCommentResult);
    }

}
