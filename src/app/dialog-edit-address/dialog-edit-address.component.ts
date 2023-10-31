import { Component, inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  userId: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  save() {
    this.loading = true;
    const db = doc(this.firestore, `user/${this.userId}`);
    updateDoc(db, this.user.toJSON())
      .then(() => {
        this.dialogRef.close();
        this.loading = false;
      });
  }

}
