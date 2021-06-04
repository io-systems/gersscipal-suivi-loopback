import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class IoSuiviApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    this.static('/workshop', path.join(__dirname, '../public'));
    this.static('/workstation', path.join(__dirname, '../public'));
    this.static('/operation', path.join(__dirname, '../public'));
    this.static('/message-history', path.join(__dirname, '../public'));
    this.static('/message-standard', path.join(__dirname, '../public'));
    this.static('/message-status', path.join(__dirname, '../public'));
    this.static('/fabrication-order', path.join(__dirname, '../public'));
    this.static('/licence', path.join(__dirname, '../public'));
    this.static('/hmi-recipe', path.join(__dirname, '../public'));
    this.static('/app-setup', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
