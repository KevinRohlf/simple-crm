import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  birthDate: Date;
  firestore: Firestore = inject(Firestore)
  users$: Observable<any>;
  allUsers;


  ngOnInit(): void {
    
  }

  constructor(public dialog: MatDialog) { 
    const itemCollection = collection(this.firestore, 'user');
    this.users$ = collectionData(itemCollection, { idField: 'id' });

    this.users$.subscribe((newUsers) => {
      console.log('New users are:', newUsers)
      this.allUsers = newUsers;
    });
    console.log(this.allUsers)

  }
  
  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

}
