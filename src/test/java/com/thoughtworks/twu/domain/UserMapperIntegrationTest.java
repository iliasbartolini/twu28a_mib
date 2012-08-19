package com.thoughtworks.twu.domain;


import com.thoughtworks.twu.persistence.UserMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

public class UserMapperIntegrationTest extends IntegrationTest {

    @Autowired
    private UserMapper userMapper;


    @Test
    public  void shouldChooseUserByUserName() {
        String bill = "Bill";
        addUserToRepository(bill);
        User user = userMapper.getUser(bill);
        assertThat(user.getName(), equalTo("Bill"));
    }

    private void addUserToRepository(String name) {
        userMapper.insertUser(new User(111, name));
    }
    
}
