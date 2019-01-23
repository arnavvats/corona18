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
import { PricingComponent } from './pages/pricing/pricing.component';
import { PricingCardComponent } from './pages/pricing/pricing-card/pricing-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { CarouselModule, BsDropdownModule } from 'ngx-bootstrap';
import { TeamRegistrationComponent } from './pages/event/team-registration/team-registration.component';
import { SoloRegistrationComponent } from './pages/event/solo-registration/solo-registration.component';
import { ErrorComponent } from './pages/error/error.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { SoloRegistrationActivityComponent } from './pages/dashboard/solo-registration-activity/solo-registration-activity.component';
import { TeamRegistrationActivityComponent } from './pages/dashboard/team-registration-activity/team-registration-activity.component';
import { InputTrimModule } from 'ng2-trim-directive';
import { DirectorsDeskComponent } from './pages/directors-desk/directors-desk.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';
import { DevelopersComponent } from './pages/developers/developers.component';
import { LiveStreamComponent } from './pages/live-stream/live-stream.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';

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
    SafeHtmlPipe,
    SnackbarComponent,
    LoaderComponent,
    NotificationComponent,
    ProfileComponent,
    EventRoundsComponent,
    TroubleShooterComponent,
    PricingComponent,
    PricingCardComponent,
    SidenavComponent,
    TeamRegistrationComponent,
    SoloRegistrationComponent,
    ErrorComponent,
    DashboardComponent,
    SoloRegistrationActivityComponent,
    TeamRegistrationActivityComponent,
    DirectorsDeskComponent,
    FacultyComponent,
    OurTeamComponent,
    DevelopersComponent,
    LiveStreamComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    HttpClientModule,
    NgxChartsModule,
    ChartsModule,
    InputTrimModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent, SnackbarComponent]
})
export class AppModule {
  constructor() {
  }
 }
