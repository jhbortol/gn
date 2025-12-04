import 'zone.js';

// Load network obfuscator early to prevent credential exposure in DevTools
import './app/core/network-obfuscator';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
