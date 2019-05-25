import { UserModel } from '../models/user.model';
import { Injectable } from '@angular/core';
import { IJsonDeserializer, IJsonDeserializerContext } from 'json-adapter';

@Injectable()
export class UserAdapter implements IJsonDeserializer<UserModel> {

    deserialize(value: any, jsonAdapterContext: IJsonDeserializerContext): UserModel {
        const user = new UserModel();
        user.id = value.id;
        user.name = value.name;
        return user;
    }

}
