package com.thoughtworks.twu.service;

import com.thoughtworks.twu.domain.User;
import com.thoughtworks.twu.persistence.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User getUser(String name){
        return userMapper.getUser(name);
    }


}
