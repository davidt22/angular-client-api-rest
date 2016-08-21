import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes'; //importamos las rutas

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS])
    .catch(err => console.log(err));
