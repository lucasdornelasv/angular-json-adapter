import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { JsonAdapterService } from './json-adapter.service';
import { JSON_ADAPTER_STORE, globalInstanceStore } from './json-adapter.store';
import { IJsonDeserializer } from './json-deserializer.interface';

declare interface AdapterMap<T> {
  type: Type<T>;
  adapter: Type<IJsonDeserializer<T>>;
}

@NgModule({
  providers: [
    { provide: JSON_ADAPTER_STORE, useValue: globalInstanceStore },
    JsonAdapterService
  ]
})
export class JsonAdapterModule {
  static withAdapters(
    adapters: AdapterMap<any>[] = []
  ): ModuleWithProviders<JsonAdapterModule> {
    let size = 0;
    if (adapters) {
      size = adapters.length;
    }
    const providers = new Array(size);
    if (adapters) {
      let adapterMap: AdapterMap<any>;
      for (let i = 0; i < size; i++) {
        adapterMap = adapters[i];
        providers[i] = adapterMap.adapter;
        globalInstanceStore.set(adapterMap.type, adapterMap.adapter);
      }
    }

    return {
      ngModule: JsonAdapterModule,
      providers
    };
  }
}
