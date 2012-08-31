package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.service.CommentService;
import com.thoughtworks.twu.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class CommentController {

    ICommentService iCommentService;
    @Autowired
    public CommentController(ICommentService iCommentService)
    {
        this.iCommentService = iCommentService;
    }
    @RequestMapping(value = "newComment", method= RequestMethod.GET)
    public String newComment(){
        return "checkSql";
    }
    @RequestMapping(value = "newComment", method= RequestMethod.POST)
    public String newComment(@ModelAttribute("comment") Comment comment){
        return createComment(comment.name,comment.comment);
    }
    public String createComment(String name, String comment) {
        Comment savedComment = iCommentService.addNewComment(name, comment);
        return String.format("{'id': %d,'name':'%s','comment':'%s'}",savedComment.id, savedComment.name, savedComment.comment);
    }
}
