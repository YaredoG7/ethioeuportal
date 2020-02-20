import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ethio-eu-portal';

  public username: string;
  public password: string;
  public rememberMe: boolean;

  public config: ToasterConfig = 
  new ToasterConfig({
      showCloseButton: true, 
      tapToDismiss: true, 
      timeout: 0,
      animation: 'fade'
  });
 
}

