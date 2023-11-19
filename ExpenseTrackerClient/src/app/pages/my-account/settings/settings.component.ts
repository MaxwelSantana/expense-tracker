import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private settingsService: SettingsService, private route:Router) {}

  deleteAccount() {
    this.settingsService.dAccount().subscribe(
      (response) => {
        // Handle success response, e.g., redirecting to a different page
        console.log('Account deleted successfully', response);
        // Perform any other necessary actions after account deletion
      },
      (error) => {
        // Handle error response, e.g., show an error message
        console.error('Failed to delete account', error);
      }
    );}  
}
