import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { AuthenticationModule } from './authentication/authentication.module';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { ChangetextDirective } from './changetext.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChangetextDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    CoreModule,
    FormsModule,
    UserModule
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { 


}
