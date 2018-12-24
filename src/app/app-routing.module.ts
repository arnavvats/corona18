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
import { EventPhnComponent} from './pages/event-phn/event-phn.component'
import { AuthGuard } from './shared/guards/auth.guard';
import { UnAuthGuard } from './shared/guards/un-auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'events/:id', component: EventComponent},
  {path: 'sign-in', component: SigninComponent, canActivate: [UnAuthGuard]},
  {path: 'campus-ambassador', component: AmbassadorComponent},
  {path: 'sponsors', component: SponsorsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'event-phn/:id', component: EventPhnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
