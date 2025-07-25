import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
