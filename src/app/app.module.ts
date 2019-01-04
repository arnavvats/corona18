import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { EventButtonComponent } from './shared/components/event-button/event-button.component';
import { EventComponent } from './pages/event/event.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AmbassadorComponent } from './pages/ambassador/ambassador.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { ListItemDirective } from './shared/directives/list-item.directive';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ParticlesModule } from 'angular-particle';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SafePipe } from './shared/pipes/safe.pipe';
 import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EventRoundsComponent } from './pages/event/event-rounds/event-rounds.component';
import { TroubleShooterComponent } from './pages/signin/trouble-shooter/trouble-shooter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EventButtonComponent,
    EventComponent,
    SigninComponent,
    AmbassadorComponent,
    SponsorsComponent,
    ListItemDirective,
    ContactUsComponent,
    AboutUsComponent,
    GalleryComponent,
    ModalComponent,
    SafePipe,
    SnackbarComponent,
    LoaderComponent,
    NotificationComponent,
    ProfileComponent,
    EventRoundsComponent,
    TroubleShooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    ParticlesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent, SnackbarComponent]
})
export class AppModule {
  constructor() {
  }
 }
