import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  firestore: Firestore = inject(Firestore);
  userId: string;
  user: User;
  isDataLoaded: boolean;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id');
      console.log('got id:', this.userId)
      this.getUser();
    })
  }

  ngOnInit(): void {
    
  }

  getUser() {
    let db = doc(this.firestore, `user/${this.userId}`);
    docData(db).subscribe((user: any) => {
      this.user = new User(user);
      this.isDataLoaded = true;
    })
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

}
