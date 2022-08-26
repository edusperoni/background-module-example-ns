import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";


@NgModule({
  bootstrap: [],
  imports: [NativeScriptModule, NativeScriptHttpClientModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BackgroundModule {
  ngDoBootstrap() {}
}
