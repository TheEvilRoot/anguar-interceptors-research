import {Component, Inject, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IGithubProfile} from "../app-form/app-form.service";

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public profile: IGithubProfile,
    public dialogRef: MatDialogRef<ProfileModalComponent>
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
