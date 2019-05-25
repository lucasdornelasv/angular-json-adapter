import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { JsonAdapterModule } from "json-adapter";
import { UserModel } from "./models/user.model";
import { UserAdapter } from "./adapters/user.adapter";
import { DogModel } from './models/dog.model';
import { DogAdapter } from './adapters/dog.adapter';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    JsonAdapterModule.withOptions({
      providers: [
        { provide: UserModel, useClass: UserAdapter },
        { provide: DogModel, useClass: DogAdapter }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
