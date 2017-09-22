import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProcessesProviderService } from '@services/processes-provider/processes-provider.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  processIdControl: FormControl;
  keyControl: FormControl;
  selectedFilename = '';

  loading = false;

  constructor(
    public dialogRef: MdDialogRef<LoginFormComponent>,
    public processesProvider: ProcessesProviderService,
    public snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.processIdControl = new FormControl('', [Validators.required]);
    this.keyControl = new FormControl('', [Validators.required]);
    this.form = new FormGroup({
      process: this.processIdControl,
      key: this.keyControl
    });
  }

  fileSelected(event: any) {
    const fileObj = event.target.files[0];
    this.selectedFilename = fileObj['name'];
    const reader = new FileReader();
    reader.onload = (file: any) => {
      this.keyControl.setValue(file.target.result);
    };

    reader.readAsText(fileObj);
  }

  submit() {
    this.loading = true;
    this.form.disable();
    this.processesProvider.load('59c3ecb56f197830243f9961').take(1).subscribe((process) => {
      this.snackbar.open('Logged in', 'DISMISS', {
        duration: 1500
      });

      this.dialogRef.close(true);
    }, (err) => {
      this.loading = false;
      this.form.enable();
    });
  }

}
