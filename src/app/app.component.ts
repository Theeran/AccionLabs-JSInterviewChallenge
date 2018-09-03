import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';
import { User } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private showUserList: boolean;
  private fetchUserListFailed: boolean;
  private showSearch: boolean;
  private usersList: User;
  private filterByID: string;
  private filterByTitle: string;
  private filterByBody: string;
  private filterByIDSearchObj: any;
  private filterByTitleSearchObj: any;
  private filterByBodySearchObj: any;
  private key: string;
  private reverse: boolean;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.showUserList = false;
    this.fetchUserListFailed = false;
    this.showSearch = false;
    this.filterByBody = '';
    this.filterByBodySearchObj = '';
    this.filterByID = '';
    this.filterByIDSearchObj = '';
    this.filterByTitle = '';
    this.filterByTitleSearchObj = '';
    this.sort('id');
    this.getUsersList();
  }

  toggleSearchIcon() {
    this.showSearch = !this.showSearch;
  }

  getUsersList() {
    this.appService.getUserslist().subscribe(
      (data) => {
        this.usersList = data;
        this.showUserList = true;
        this.initializeFilterContext();
        this.sort('id');
      },
      (error) => {
        this.showUserList = false;
        this.fetchUserListFailed = true;
      }
    );
  }
  
  initializeFilterContext() {
    this.filterByIDSearchObj = {
      'id': {
        'type': 'text',
        'value': this.filterByID,
        'matchFullCase': false
      }
    };
    this.filterByTitleSearchObj = {
      'title': {
        'type': 'text',
        'value': this.filterByTitle,
        'matchFullCase': true
      }
    };
    this.filterByBodySearchObj = {
      'body': {
        'type': 'array',
        'value': this.filterByBody,
        'matchFullCase': false
      }
    };
  }
  
  updateFilterContext(obj, key, newVal) {
    this[obj][key]['value'] = newVal;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


}
