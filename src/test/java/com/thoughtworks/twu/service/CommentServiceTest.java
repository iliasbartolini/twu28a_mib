package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.persistence.ICommentMapper;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

public class CommentServiceTest {
    @Test
    public void insertCommentShouldReturnSavedComment(){

        ICommentMapper mockedICommentMapper = mock(ICommentMapper.class);
        CommentService commentService = new CommentService(mockedICommentMapper);
        Comment newComment = new Comment("anoop","hi helllo");
        when(mockedICommentMapper.insertComment(newComment)).thenReturn(newComment);

        Comment savedComment = commentService.addNewComment(newComment.name, newComment.comment);

        assertEquals(newComment, savedComment);
        verify(mockedICommentMapper).insertComment(newComment);
    }

}


