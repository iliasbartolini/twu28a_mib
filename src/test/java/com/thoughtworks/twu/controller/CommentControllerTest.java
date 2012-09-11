package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.service.ICommentService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.matchers.JUnitMatchers.containsString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
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

    @Test
    public void shouldReturnCorrectFormatObjectWhenDatabaseEmpty() {
        ICommentService mockICommentService = mock(ICommentService.class);
        Integer boardID = 1;
        when(mockICommentService.getAllComments(boardID)).thenReturn(new LinkedList<Comment>());
        CommentController controller= new CommentController(mockICommentService);

        Assert.assertEquals("{'comments': []}", controller.getComments(boardID));
    }

    @Test
    public void shouldReturnCommentsAsJSON() {
        ICommentService mockICommentService = mock(ICommentService.class);
        Integer boardID = 1;
        Comment comment=new Comment(boardID, "name", "message");
        List commentsList=new LinkedList<Comment>();
        commentsList.add(comment);

        when(mockICommentService.getAllComments(boardID)).thenReturn(commentsList);
        CommentController controller= new CommentController(mockICommentService);

        String commentsJSON = controller.getComments(boardID);

        assertThat(commentsJSON, containsString("\"board_id\":" + boardID));
        assertThat(commentsJSON, containsString("\"name\":\"name\""));
        assertThat(commentsJSON, containsString("\"comment\":\"message\""));
    }
}
