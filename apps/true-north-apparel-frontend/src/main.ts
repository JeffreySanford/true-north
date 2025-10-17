
import 'reflect-metadata';
import 'zone.js';
import '@angular/compiler';
import './styles.scss';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
