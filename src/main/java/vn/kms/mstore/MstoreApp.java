package vn.kms.mstore;

import com.mangofactory.swagger.plugin.EnableSwagger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by trungnguyen on 6/22/15.
 */
@SpringBootApplication
@EnableSwagger
public class MstoreApp {
    public static void main(String[] args) {
        new SpringApplication(MstoreApp.class).run(args);
    }
}
