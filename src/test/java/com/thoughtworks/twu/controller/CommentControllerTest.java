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
        Comment savedComment = new Comment(10, "mib", "hello");
        savedComment.commentID = 10;
        when(mockedCommentService.addNewComment(10, "mib","hello")).thenReturn(savedComment);

        String savedCommentResult = commentController.createComment(10, "mib", "hello");

        assertEquals(savedComment.toJSON(), savedCommentResult);
    }
                      /*
    @Test
    public void shouldReturnAllCommentsForABoard(){
        Comment comment1=new Comment(1,"mib","hello");
        comment1.commentID=1;
//        Comment comment2=new Comment(1,"mib","hi");
//        comment2.commentID=2;

        when(mockedCommentService.addNewComment(1,"mib","hello")).thenReturn(comment1);;

//        when(mockedCommentService.addNewComment(1,"mib","hi")).thenReturn(comment2);;
//        String savedComment2=commentController.createComment(1,"mib","hi");

        List<Comment> savedComments=new ArrayList<Comment>();
        savedComments.add(comment1);
//        savedComments.add(comment2);

        when(mockedCommentService.getAllComments(1)).thenReturn(savedComments);
        String AllComments=commentController.getComments(1);

//        assertEquals(commentController.commentsToJson(savedComments),AllComments);
    }                   */
}
