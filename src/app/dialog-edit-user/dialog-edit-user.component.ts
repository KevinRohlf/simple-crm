import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  userId: string;
  loading = false;
  birthDate: Date;

  ngOnInit(): void {
    this.birthDate = new Date(this.user.birthDate)
  }


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) { 
    
  }

  save() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    const db = doc(this.firestore, `user/${this.userId}`);
    updateDoc(db, this.user.toJSON())
    .then(() => {
      this.dialogRef.close();
      this.loading = false;
    });
    
  }
}
