package vn.kms.mstore;

import com.mangofactory.swagger.plugin.EnableSwagger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * Created by trungnguyen on 6/22/15.
 */
@SpringBootApplication
@EnableSwagger
public class ServiceApp {
    public static void main(String[] args) {
        new SpringApplication(ServiceApp.class).run(args);
    }
}
