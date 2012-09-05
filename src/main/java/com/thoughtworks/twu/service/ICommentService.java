package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;

public interface ICommentService {
    public Comment addNewComment(Integer boardID, String name, String comment);
}
