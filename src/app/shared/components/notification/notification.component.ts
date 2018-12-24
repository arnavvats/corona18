import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationsService) { }
  notifications;
  ngOnInit() {
    this.notifications = [];
    this.notificationService.notificationsArray.subscribe(notifications => {
      this.notifications = notifications;
    });
  }
  clearNotifications() {
    this.notificationService.clearNotificaitonArray();
  }
}
