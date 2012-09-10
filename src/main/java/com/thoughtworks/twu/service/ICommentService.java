package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;

import java.util.List;

public interface ICommentService {
    public Comment addNewComment(Integer boardID, String name, String comment);
    public Integer getCommentsCount(Integer boardID);
    public void deleteComments(Integer boardID);
    public List<Comment> getAllComments(Integer boardID);

}
