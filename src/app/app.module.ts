import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, asapScheduler, from, fromEvent, interval, merge, of, pipe } from 'rxjs';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { SharedListPipe } from './pipes/shared-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SharedListPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgbDropdownModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    NgbModule.forRoot(),
  ],
  providers: [
    HttpClientModule,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
