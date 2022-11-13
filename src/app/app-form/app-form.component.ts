import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AppFormService, IGithubProfile} from "./app-form.service";
import {AppService} from "../app.service";
import {MatDialog} from "@angular/material/dialog";
import {ProfileModalComponent} from "../profile-modal/profile-modal.component";

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {

  usernameFormControl: FormControl<string | null> = new FormControl<string>('');

  constructor(
    private profileDialog: MatDialog,
    private formService: AppFormService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  showProfile(profile: IGithubProfile) {
    this.profileDialog.open(ProfileModalComponent, {
      data: profile
    })
  }

  onSubmit() {
    const username: string | null = this.usernameFormControl.value
    if (username === null || username.length < 3) {
      return
    }
    this.appService.setLoading(`loading profile ${username}`)
    this.formService.getGithubProfile(username).subscribe({
      next: (result) => {
        this.showProfile(result)
        this.appService.stopLoading()
      },
      error: (error: Error) => {
        this.usernameFormControl.setErrors({request: error.message})
        this.appService.stopLoading()
      }
    })
  }
}
