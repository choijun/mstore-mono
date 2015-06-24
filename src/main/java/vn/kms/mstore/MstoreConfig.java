package vn.kms.mstore;

import com.mangofactory.swagger.configuration.SpringSwaggerConfig;
import com.mangofactory.swagger.models.dto.ApiInfo;
import com.mangofactory.swagger.plugin.SwaggerSpringMvcPlugin;
import org.h2.server.web.WebServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by trungnguyen on 6/22/15.
 */
@Configuration
public class MstoreConfig {
    @Autowired
    private SpringSwaggerConfig swaggerConfig;

    @Value("${info.name}")
    private String appName;

    @Value("${info.version}")
    private String appVersion;

    @Bean
    public SwaggerSpringMvcPlugin swaggerPlugin() {
        return new SwaggerSpringMvcPlugin(swaggerConfig)
                .apiInfo(new ApiInfo(appName, appVersion, null, null, null, null))
                .useDefaultResponseMessages(false)
                .includePatterns("/api/.*");
    }

    @Bean
    ServletRegistrationBean h2servletRegistration(){
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(new WebServlet());
        registrationBean.addUrlMappings("/db/*");
        return registrationBean;
    }
}