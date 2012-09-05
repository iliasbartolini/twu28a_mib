public class ServerRequestStub implements ServerRequest {


    public ServerRequestStub() {
    }

    @Override
    public String post(String command, String data) {
        String response = "{\"votes_count\":0," +
                "\"created_at\":\"2012/08/24 11:28:02 +0530\"," +
                "\"updated_at\":\"2012/08/24 11:28:02 +0530\"," +
                "\"section_id\":2," +
                "\"commentID\":39," +
                "\"message\":\"message\"}";
        return response;
    }
}
