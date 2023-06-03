import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date;
  firestore: Firestore = inject(Firestore)
  db;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.db = collection(this.firestore, 'user');
  }

  save() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is: ', this.user);


    addDoc(this.db, this.user.toJSON()).then((result: any) => {
      this.loading = false;
      console.log('finished', result);
      this.dialogRef.close()

    })
    
  }

}
