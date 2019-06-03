import { Injectable, Injector, Type, Inject } from '@angular/core';
import { IJsonDeserializerContext } from './json-context.interface';
import { IJsonDeserializer } from './json-deserializer.interface';
import { JSON_ADAPTER_STORE } from './json-adapter.store';

@Injectable({
  providedIn: 'root'
})
export class JsonAdapterService implements IJsonDeserializerContext {
  constructor(
    private injector: Injector,
    @Inject(JSON_ADAPTER_STORE)
    private adapterStore: Map<Type<any>, Type<IJsonDeserializer<any>>>
  ) {}

  deserialize<T>(type: Type<T>, value: any): T {
    const adapter = this.getDeserializer<T>(type);
    return this.deserializeInternal<T>(adapter, value);
  }

  deserializeArray<T>(type: Type<T>, values: any[]): T[] {
    const adapter = this.getDeserializer<T>(type);
    return this.mapArray(values, value =>
      this.deserializeInternal<T>(adapter, value)
    );
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

  private getDeserializer<T>(type: Type<T>): IJsonDeserializer<T> {
    const adapterType = this.adapterStore.get(type);
    const adapter = this.injector.get(adapterType) as any;
    return adapter as IJsonDeserializer<T>;
  }
}
