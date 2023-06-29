import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { AdminModule } from './components/admin/admin.module';
import { AccountModule } from './components/account/account.module';
import { MessageService } from './services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    AccountModule,
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwtToken');
        },
        allowedDomains: ['apit2.web2.anasource.com'],
        disallowedRoutes: ['https://apit2.web2.anasource.com/Accounts/Login'],
      },
    }),
  ],
  providers: [MessageService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
