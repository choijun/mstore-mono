import { RoxieServer } from 'roxie';

@RoxieServer
export default class Application {
  configureServices(services) {
    services.useStaticFiles('./client/dist');
  }
}