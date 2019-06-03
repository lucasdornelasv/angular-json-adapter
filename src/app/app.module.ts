import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JsonAdapterModule } from 'json-adapter';
import { UserModel } from './shared/models/user.model';
import { UserAdapter } from './shared/adapters/user.adapter';
import { UserService } from './shared/services/user.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    JsonAdapterModule.withAdapters([{ type: UserModel, adapter: UserAdapter }])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
