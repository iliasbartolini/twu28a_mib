import java.io.IOException;

public interface ServerRequest {

    public String post(String command, String data) throws IOException;
}
