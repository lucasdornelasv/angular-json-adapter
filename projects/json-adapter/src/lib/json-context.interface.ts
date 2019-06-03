import { Type } from '@angular/core';

export interface IJsonDeserializerContext {
  deserialize<T>(type: Type<T>, value: any): T;

  deserializeArray<T>(type: Type<T>, values: any[]): T[];
}
