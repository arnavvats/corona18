import { LiveStreamComponent } from './pages/live-stream/live-stream.component';
import { DevelopersComponent } from './pages/developers/developers.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AmbassadorComponent } from './pages/ambassador/ambassador.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnAuthGuard } from './shared/guards/un-auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ErrorComponent } from './pages/error/error.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DirectorsDeskComponent } from './pages/directors-desk/directors-desk.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'events/:id', component: EventComponent},
  {path: 'sign-in', component: SigninComponent, canActivate: [UnAuthGuard]},
  {path: 'campus-ambassador', component: AmbassadorComponent},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'directors-desk', component: DirectorsDeskComponent},
  {path: 'faculty', component: FacultyComponent},
  {path: 'our-team', component: OurTeamComponent},
  {path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  {path: 'developers', component: DevelopersComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  {path: 'live', component: LiveStreamComponent},
  {
    path: 'error',
    children: [
      {
        path: 'no-internet',
        component: ErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
