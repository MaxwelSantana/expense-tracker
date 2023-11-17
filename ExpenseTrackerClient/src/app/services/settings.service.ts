import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { User } from './user.model';

@Injectable()
export class SettingsService {
  constructor(private datasource: RestDataSource) {}

  cPassword(user: User,currentPassword:string, newPassword: string, newPassword2:string): Observable<boolean> {
    return this.datasource.changePassword(user,currentPassword, newPassword,newPassword2);
  }

}
