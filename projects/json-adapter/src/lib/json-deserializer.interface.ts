import { IJsonDeserializerContext } from './json-context.interface';

export interface IJsonDeserializer<T> {
  deserialize(value: any | T, jsonDeserializerContext: IJsonDeserializerContext): T;
}
