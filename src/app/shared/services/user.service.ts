import { Injectable } from '@angular/core';
import { JsonAdapterService } from 'json-adapter';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private jsonAdapterService: JsonAdapterService) {}

  getUser() {
    return of({
      id: 1,
      name: 'User 1'
    }).pipe(map(item => this.jsonAdapterService.deserialize(UserModel, item)));
  }
}
