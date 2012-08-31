package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.service.CommentService;
import com.thoughtworks.twu.service.ICommentService;

public class CommentController {


    ICommentService iCommentService;
    public CommentController(ICommentService iCommentService)
    {
         this.iCommentService = iCommentService;
    }

    public String createComment(String name, String comment) {
        Comment savedComment = iCommentService.addNewComment(name, comment);
        return String.format("{'id': %d,'name':'%s','comment':'%s'}",savedComment.id, savedComment.name, savedComment.comment);
    }
}
