import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class GetIdeaBoardInfo {
    public static void main(String a[]) throws Exception {
        Document doc = Jsoup.connect("http://www.ideaboardz.com/for/Xinyu/4422").get();
        Elements newsHeadlines = doc.select("#ideaboardTitle");
        System.out.println(newsHeadlines.html());
        newsHeadlines = doc.select(".sectionTitle");
        System.out.println(newsHeadlines.html());

        Elements sections;
        sections = doc.getElementsByClass("section");

        for (Element section : sections) {
            System.out.println(section.id().replace("section", ""));
        }
    }
}

