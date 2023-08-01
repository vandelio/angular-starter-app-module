import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, TimelineComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
