/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Chart, registerables } from 'chart.js';
import { AppModule } from './app/app.module';
import 'chartjs-adapter-date-fns';
import{registerLicense} from '@syncfusion/ej2-base';

Chart.register(...registerables);
registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x0THxbf1x0ZFRGal9VTnRWUiweQnxTdEFjXX1XcXRQR2JYUUVwXw==")

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
