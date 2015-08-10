# mStore - Monolithic-based version

Developing Monolithic-based web application using [Spring Boot](http://projects.spring.io/spring-boot/).

## How to Build

```
$ mvn clean package
```

## How to Run

Run module `service` by going to its directory and perform below command:

```
$ mvn spring-boot:run
```

Run module `webui` by going to its directory (webui/angular, webui/angular-es6, webui/react) and perform below command:

```
$ npm install
$ bower install
$ gulp
```

Visit [http://localhost:8000](http://localhost:8000) for REST service

Visit [http://localhost:8888](http://localhost:8888) for Web UI


## IDE Support

To use these projects in an IDE you will need the [project Lombok](http://projectlombok.org/features/index.html) agent.
Full instructions can be found in the Lombok website. The sign that you need to do this is a lot of compiler errors
to do with missing methods and fields.
