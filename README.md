# mStore - Monolithic-based version

Developing Monolithic-based web application using

* [Spring Boot](http://projects.spring.io/spring-boot/)
* [Angular](https://angular.io)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## IDE Support

For Spring Boot project, you will need the [project Lombok](https://projectlombok.org/features/all) agent.
Full instructions can be found in the Lombok website. The sign that you need to do this is a lot of compiler errors
to do with missing methods and fields.

## Other Commands

### Gradle

* Create new Java application: `gradle init --type java-application`
* Build Java application: `gradle build`
* Build with continuous: `gradle build --continuous`
* Run Spring Boot application: `gradle bootRun`
