package vn.kms.mstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

/**
 * Created by trungnguyen on 7/1/15.
 */
@SpringBootApplication
@EnableZuulProxy
public class WebUiApp extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WebUiApp.class);
    }

    public static void main(String[] args) {
        new SpringApplication(WebUiApp.class).run(args);
    }
}
