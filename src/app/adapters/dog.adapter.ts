import { IJsonDeserializer, IJsonDeserializerContext } from "json-adapter";
import { DogModel } from "../models/dog.model";
import { UserModel } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DogAdapter implements IJsonDeserializer<DogModel> {

  deserialize(value: any, jsonAdapterContext: IJsonDeserializerContext): DogModel {
    const dog = new DogModel();
    dog.id = value.id;
    dog.name = value.name;
    dog.owner = jsonAdapterContext.deserialize<UserModel>(UserModel, value.owner);
    return dog;
  }

}
