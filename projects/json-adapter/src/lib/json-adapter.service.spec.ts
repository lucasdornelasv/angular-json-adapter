import { TestBed } from '@angular/core/testing';

import { JsonAdapterService } from './json-adapter.service';
import { IJsonDeserializer } from './json-deserializer.interface';
import { IJsonDeserializerContext } from './json-context.interface';

class UserModel {
  id: number;
  name: string;
}

class UserAdapter implements IJsonDeserializer<UserModel> {

  deserialize(value: any, jsonDeserializerContext: IJsonDeserializerContext): UserModel {
    const user = new UserModel();
    user.id = value.id;
    user.name = value.name;
    return user;
  }

}

describe('JsonAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: UserModel, useFactory: () => new UserAdapter()}]
  }));

  it('should be created', () => {
    const service: JsonAdapterService = TestBed.get(JsonAdapterService);
    expect(service).toBeTruthy();
  });

  it('should be parse to Model', () => {
    const service: JsonAdapterService = TestBed.get(JsonAdapterService);
    const obj = {
      id: 1,
      name: "Name"
    };

    const user = service.deserialize<UserModel>(UserModel, obj);
    expect(user).toBeTruthy();
    expect(user instanceof UserModel).toBeTruthy();
    expect(user.id === obj.id).toBeTruthy();
    expect(user.name === obj.name).toBeTruthy();
  });
});
