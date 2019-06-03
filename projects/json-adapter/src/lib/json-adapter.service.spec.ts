import { TestBed } from '@angular/core/testing';

import { JsonAdapterService } from './json-adapter.service';
import { IJsonDeserializer } from './json-deserializer.interface';
import { IJsonDeserializerContext } from './json-context.interface';
import { JsonAdapterModule } from './json-adapter.module';
import { Injectable } from '@angular/core';

class UserModel {
  id: number;
  name: string;
}

@Injectable()
class UserAdapter implements IJsonDeserializer<UserModel> {
  deserialize(
    value: any,
    jsonDeserializerContext: IJsonDeserializerContext
  ): UserModel {
    const user = new UserModel();
    user.id = value.id;
    user.name = value.name;
    return user;
  }
}

describe('JsonAdapterService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        JsonAdapterModule.withAdapters([
          { type: UserModel, adapter: UserAdapter }
        ])
      ]
    })
  );

  it('should be created', () => {
    const service: JsonAdapterService = TestBed.get(JsonAdapterService);
    expect(service).toBeTruthy();
  });

  it('should be parsed to Model', () => {
    const service: JsonAdapterService = TestBed.get(JsonAdapterService);
    const obj = {
      id: 1,
      name: 'Name'
    };

    const user = service.deserialize(UserModel, obj);
    expect(user).toBeTruthy();
    expect(user instanceof UserModel).toBeTruthy();
    expect(user.id).toEqual(obj.id);
    expect(user.name).toEqual(obj.name);
  });

  it('should be parsed to Models', () => {
    const service: JsonAdapterService = TestBed.get(JsonAdapterService);
    const size = 10;
    const objs = new Array(size);

    for (let i = 0; i < size; i++) {
      objs[i] = {
        id: i,
        name: 'Name ' + i
      };
    }

    const users = service.deserializeArray(UserModel, objs);
    expect(users).toBeTruthy();
    expect(users.length === objs.length).toBeTruthy();

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const obj = objs[i];
      expect(user instanceof UserModel).toBeTruthy();
      expect(user.id).toEqual(obj.id);
      expect(user.name).toEqual(obj.name);
    }
  });

  it('should be throwed an error', () => {
    const service: JsonAdapterService = TestBed.get(JsonAdapterService);

    try {
      const user = service.deserialize(UserModel, null);
    } catch (err) {
      expect(err.message).toContain('Cannot read property');
    }
  });
});
