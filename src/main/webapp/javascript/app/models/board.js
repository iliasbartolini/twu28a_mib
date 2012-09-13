IdeaBoardz.Board = function(name, id, sections) {
    this.name = name;
    this.id = id;
    this.sections = sections;
    this.ideas = null;
    this.timer = null;
    this.startedPollingForComments = false;

    this.commentCountHelper = new IdeaBoardz.CommentCountHelper(this.id);
    this.commentCountHelper.start();
    console.log(this.commentCountHelper);
}

