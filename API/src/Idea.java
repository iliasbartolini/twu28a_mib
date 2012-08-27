
//Job: Understands how to update a sticky
public class Idea {
    Integer id;
    private String created_at;
    private String updated_at;
    private Integer votes_count;
    private String message;
    private Integer section_id;

    public Idea(ResponseData responseData) {
        this.id = responseData.getId();
        this.created_at = responseData.getCreated_at();
        this.updated_at = responseData.getUpdated_at();
        this.votes_count = responseData.getVotes_count();
        this.message = responseData.getMessage();
        this.section_id = responseData.getSection_id();
    }

    public Idea(Integer id, Integer section_id, String message, String created_at, String updated_at, Integer votes_count) {

        this.id = id;
        this.section_id = section_id;
        this.message = message;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.votes_count = votes_count;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Idea{" +
                "id=" + id +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Idea)) return false;

        Idea idea = (Idea) o;

        if (!id.equals(idea.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    public String getCreated_at() {
        return created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public Integer getVotes_count() {
        return votes_count;
    }

    public String getMessage() {
        return message;
    }

    public Integer getSection_id() {
        return section_id;
    }
}
