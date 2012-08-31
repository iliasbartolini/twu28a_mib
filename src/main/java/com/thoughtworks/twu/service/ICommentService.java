package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.Comment;

public interface ICommentService {
    public Comment addNewComment(String name, String comment);
}
