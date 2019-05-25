import { IJsonSerializerContext } from './json-context.interface';

export interface IJsonSerializer<T> {
  serialize(value: T, jsonSerializerContext: IJsonSerializerContext): any;
}
