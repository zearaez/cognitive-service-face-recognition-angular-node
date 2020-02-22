import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { XHRBackend, RequestOptions } from '@angular/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';
import { provideInterceptorService, InterceptorService } from 'ng2-interceptors';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CameraSnapshotComponent } from './components/camera-snapshot/camera-snapshot.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { UpdateImageComponent } from './components/update-image/update-image.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { BlockUIComponent } from './components/block-ui/block-ui.component';

// services
import { httpInterceptor } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { BlockUIService } from './services/block-ui.service';
import { UserRestService } from './services/user-rest.service';

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, authService, snackbar, blockUI){
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(new httpInterceptor(authService, snackbar, blockUI));
  return service;
}

@NgModule({
  declarations: [ 
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CameraSnapshotComponent,
    ImagePickerComponent,
    UpdateImageComponent,
    UpdatePasswordComponent,
    BlockUIComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSnackBarModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LocalStorageModule.forRoot(),
  ],
  providers: [
    AuthService,
    BlockUIService,
    UserRestService,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, AuthService, MatSnackBar, BlockUIService],
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
