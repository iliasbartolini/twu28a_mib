package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Comment;
import com.thoughtworks.twu.service.ICommentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class CommentController {
    ICommentService iCommentService;
    public CommentController(){

    }
    public CommentController(ICommentService iCommentService)
    {
         this.iCommentService = iCommentService;
    }

    public void setICommentService(ICommentService iCommentService) {
        this.iCommentService = iCommentService;
    }

    @RequestMapping(value = "/postComment",method = RequestMethod.POST)
    public @ResponseBody String postComment(@RequestParam(value = "board_id")Integer boardID,@RequestParam(value = "name")
                                String name,@RequestParam(value = "comment") String comment) {
//         setICommentService(new CommentService());
        return createComment(boardID,name,comment);
    }

    public String createComment(Integer boardID,String name,String comment){
        Comment savedComment = iCommentService.addNewComment(boardID, name, comment);
        return savedComment.toJSON();
    }
}
