import java.io.IOException;

public interface SendRequest {

    public String post(String command, String data) throws IOException;
}
