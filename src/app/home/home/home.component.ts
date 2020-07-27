import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedToAdd: any;
  selectedToRemove: any;
  selectedItems: any = [];
  groupsArray: any = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAll().subscribe((res) => {
      this.groupsArray = res.data;
      this.groupsArray = this.groupsArray.map((el) => {
        el['name'] = el['first_name'] + ' ' + el['last_name'];
        return el;
      });
    });
  }

  assign() {
    this.selectedItems = this.selectedItems.concat(this.selectedToAdd);
    this.groupsArray = this.groupsArray.filter((selectedData) => {
      return this.selectedItems.indexOf(selectedData) < 0;
    });
    this.selectedToAdd = [];
  }

  unassign() {
    this.groupsArray = this.groupsArray.concat(this.selectedToRemove);
    this.selectedItems = this.selectedItems.filter((selectedData) => {
      return this.groupsArray.indexOf(selectedData) < 0;
    });
    this.selectedToRemove = [];
  }
}
