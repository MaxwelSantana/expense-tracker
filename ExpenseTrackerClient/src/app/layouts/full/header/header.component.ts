import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(public dialog: MatDialog, private settingsService: SettingsService, private route:Router) {}

  logout(){
    this.settingsService.logout().subscribe(
      (response) => {
       
        console.log('loggout successfully', response);
        // Perform any other necessary actions after account deletion
      },
      (error) => {
        // Handle error response, e.g., show an error message
        console.error('Failed to logout', error);
      }
    );    
    this.route.navigate(['authentication/login'])
  }
}
