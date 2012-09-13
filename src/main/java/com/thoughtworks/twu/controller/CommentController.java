package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.service.CommentService;
import com.thoughtworks.twu.service.ICommentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CommentController {
    ICommentService iCommentService;

    public CommentController(){
        this(new CommentService());
    }

    public CommentController(ICommentService iCommentService)
    {
         this.iCommentService = iCommentService;
    }

    @RequestMapping(value = "/mib/getComments",method = RequestMethod.GET)
    public @ResponseBody String getComments(@RequestParam(value = "board_id")Integer boardID) {
        List<Comment> comments = iCommentService.getAllComments(boardID);
        if(comments.size()<=0)
            return "{'comments': []}";
        return commentsToJson(comments);
    }

    private String commentsToJson(List<Comment> comments) {
        String commentsInJson = "{\"comments\":[";
        for (Comment comment : comments) {
            commentsInJson=commentsInJson + comment.toJSON()+",";
        }
        commentsInJson=commentsInJson.substring(0,commentsInJson.lastIndexOf(','));
        commentsInJson+="]}";
        return commentsInJson;
    }

    @RequestMapping(value = "/mib/getCommentsCount",method = RequestMethod.GET)
    public @ResponseBody String getCommentsCount(@RequestParam(value = "board_id")Integer boardID) {
        Integer count = iCommentService.getCommentsCount(boardID);
        String countInJson =  "{\"count\":\"" + count + "\"}";
        return countInJson;
    }

    @RequestMapping(value = "/mib/postComment",method = RequestMethod.POST)
    public @ResponseBody String postComment(@RequestParam(value = "board_id")Integer boardID,@RequestParam(value = "name")
                                String name,@RequestParam(value = "comment") String comment) {
        return createComment(boardID,name,comment);
    }

    public String createComment(Integer boardID,String name,String comment){
        Comment savedComment = iCommentService.addNewComment(boardID, name, comment);
        return savedComment.toJSON();
    }
}
