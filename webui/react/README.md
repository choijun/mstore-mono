# mStore - Web UI module

## How to Build

You can also serve the UI using [Gulp](http://gulpjs.com/). As a prerequisite you need to have [NPM](https://nodejs.org/download/) and [Bower](http://bower.io/#install-bower) installed:

Next, install all dependencies needed:

    $ npm install
    $ bower install
    $ gulp

## How to Run

Right now the easiest way to run the UI is to use Spring Boot.

    $ mvn spring-boot:run
    
and visit [http://localhost:8080](http://localhost:8080).

You also could access all REST APIs by using Swagger UI at [http://localhost:8080/api.html](http://localhost:8080).

## IDE Support

To use these projects in an IDE you will need the [project Lombok](http://projectlombok.org/features/index.html) agent. 
Full instructions can be found in the Lombok website. The sign that you need to do this is a lot of compiler errors
to do with missing methods and fields.
