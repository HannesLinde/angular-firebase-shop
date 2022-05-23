import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '@app/core/services/Auth.service';

/** https://material.angular.io/components/input/overview */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup = new FormGroup({
    emailSignUp: new FormControl('', [Validators.required, Validators.email]),
    passwordSignUp: new FormControl('', Validators.required),
  });

  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}

  submitSignUp() {
    console.log(this.signUpFormGroup.value);
    this.auth.SignUp(this.signUpFormGroup.value.email, this.signUpFormGroup.value.password);
  }
}
