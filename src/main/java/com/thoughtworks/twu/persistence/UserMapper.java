package com.thoughtworks.twu.persistence;

import com.thoughtworks.twu.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;


public interface UserMapper {
    @Select("SELECT id,name FROM user where name = #{name}")
    User getUser(String name);

    @Insert("INSERT INTO user (id, name) VALUES(#{id}, #{name})")
    void insertUser(User user);
}
