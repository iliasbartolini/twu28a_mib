package com.thoughtworks.twu.domain;

/**
 * Created with IntelliJ IDEA.
 * User: nagarajr
 * Date: 30/8/12
 * Time: 1:50 PM
 * To change this template use File | Settings | File Templates.
 */
public class Comment  {
    public String name;
    public String comment;
    public int id;

    public Comment(String name, String comment) {

        this.name = name;
        this.comment = comment;
    }
}
