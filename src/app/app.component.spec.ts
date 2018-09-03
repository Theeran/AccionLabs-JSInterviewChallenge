import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { SharedListPipe } from './pipes/shared-filter.pipe';
import { User } from './app.interface';
import { constants } from './app.constants';
import { fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let testResSuccess;
  let testResFailure;
  let http;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SharedListPipe
      ],
      providers: [AppService],
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        HttpClientTestingModule,
        HttpClientModule,
        NgxPaginationModule,
        OrderModule,
        Ng2SearchPipeModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    testResSuccess = [
      {
        'userId': 1,
        'id': 1,
        'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      }
    ];

    testResFailure = {
      'actionStatus': 'FAIL',
      'actionResult': {
        'errors': [{
          'description': 'Fetch User List is failed!!!'
        }]
      }
    };

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = HttpClient;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should toggle the show search', async(() => {
    const app = fixture.nativeElement;
    component.toggleSearchIcon();
    expect(app.querySelector('.seacrh-input')).toBeNull();
    component.toggleSearchIcon();
    expect(app.querySelector('.seacrh-input')).toBeNull();
  }));

  it('should sort the colums', async(() => {
    spyOn(component, 'sort');
    component.sort('id');
    expect(component.sort).toHaveBeenCalled();
    component.sort('title');
    expect(component.sort).toHaveBeenCalled();
    component.sort('body');
    expect(component.sort).toHaveBeenCalled();
  }));

  it('should Initialize Filter Context', async(() => {
    spyOn(component, 'initializeFilterContext');
    component.initializeFilterContext();
    expect(component.initializeFilterContext).toHaveBeenCalled();
  }));

  it('app service user list success call', async(inject([AppService, HttpTestingController],
    (service: AppService, backend: HttpTestingController) => {
      const app = fixture.nativeElement;
      component.getUsersList();
      fixture.detectChanges();
      service.getUserslist().subscribe();
      // backend.expectOne(constants.GET_USER_LIST).flush(testResSuccess, { status: 200, statusText: 'Ok' });
      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromString: req.body });
        return req.url === constants.GET_USER_LIST;
      }, `Service User List Successful!`);
      expect(app.querySelector('.alert.alert-danger')).toBeFalsy();
    })));

  it('app service user list failure call', async(inject([AppService, HttpTestingController],
    (service: AppService, backend: HttpTestingController) => {
      const app = fixture.nativeElement;
      component.getUsersList();
      fixture.detectChanges();
      service.getUserslist().subscribe();
      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromString: req.body });
        return req.url === constants.GET_USER_LIST;
      }, `Service User List Failed!`);
      expect(app.querySelector('.alert.alert-danger')).toBeTruthy();
    })));

});
