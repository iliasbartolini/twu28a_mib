IdeaBoardz.Board = function(name, id, sections) {
    this.name = name;
    this.id = id;
    this.sections = sections;
    this.ideas = null;
    this.timer = null;
    this.currentCommentCount = 0;
    this.currentCommentCount = IdeaBoardz.CommentServer.instance.getCommentsCount(this.id);
    console.log("current comment count: "+this.currentCommentCount);
}

