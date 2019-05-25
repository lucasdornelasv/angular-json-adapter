import { NgModule, ModuleWithProviders } from '@angular/core';
import { JsonAdapterService } from './json-adapter.service';

@NgModule({
  providers: [JsonAdapterService]
})
export class JsonAdapterModule {

  static withOptions(options: any): ModuleWithProviders<JsonAdapterModule> {
    return {
      ngModule: JsonAdapterModule,
      providers: options.providers
    };
  }

}
