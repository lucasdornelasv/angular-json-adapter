import { Injectable, Injector, Type } from '@angular/core';
import { IJsonSerializerContext, IJsonDeserializerContext } from './json-context.interface';
import { IJsonSerializer } from './json-serializer.interface';
import { IJsonDeserializer } from './json-deserializer.interface';

@Injectable({
  providedIn: 'root'
})
export class JsonAdapterService implements IJsonSerializerContext, IJsonDeserializerContext {

  constructor(private injector: Injector) { }

  serialize<T>(type: Type<T>, value: T): any {
    const adapter = this.getSerializer<T>(type);
    return this.serializeInternal<T>(adapter, value);
  }

  serializeArray<T>(type: Type<T>, values: T[]): any[] {
    const adapter = this.getSerializer<T>(type);
    return this.mapArray(values, value => this.serializeInternal<T>(adapter, value));
  }

  deserialize<T>(type: Type<T>, value: any): T {
    const adapter = this.getDeserializer<T>(type);
    return this.deserializeInternal<T>(adapter, value);
  }

  deserializeArray<T>(type: Type<T>, values: any[]): T[] {
    const adapter = this.getDeserializer<T>(type);
    return this.mapArray(values, value => this.deserializeInternal<T>(adapter, value));
  }

  private serializeInternal<T>(adapter: IJsonSerializer<T>, value: T): any {
    const jsonObj = adapter.serialize(value, this);
    return jsonObj;
  }

  private deserializeInternal<T>(adapter: IJsonDeserializer<T>, value: any): T {
    const obj = adapter.deserialize(value, this);
    return obj;
  }

  private mapArray<T>(values: any[], mapper: (value: any) => T): T[] {
    const size = values.length;
    const result: T[] = new Array(size);
    for (let i = 0; i < size; i++) {
      result[i] = mapper(values[i]);
    }
    return result;
  }

  private getSerializer<T>(type: Type<T>): IJsonSerializer<T> {
    const adapter = this.injector.get(type) as any;
    return adapter as IJsonSerializer<T>;
  }

  private getDeserializer<T>(type: Type<T>): IJsonDeserializer<T> {
    const adapter = this.injector.get(type) as any;
    return adapter as IJsonDeserializer<T>;
  }

}
