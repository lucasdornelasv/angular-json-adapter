import { Type } from '@angular/core';

export interface IJsonSerializerContext {
  serialize<T>(type: Type<T>, value: T): any;

  serializeArray<T>(type: Type<T>, values: T[]): any[];
}

export interface IJsonDeserializerContext {
  deserialize<T>(type: Type<T>, value: any): T;

  deserializeArray<T>(type: Type<T>, values: any[]): T[];
}
