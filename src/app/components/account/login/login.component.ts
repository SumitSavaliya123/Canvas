import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Pattern } from 'src/app/constants/pattern';
import { ValidationMessages } from 'src/app/constants/validationMessages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  loginForm!: FormGroup;
  emailFormControl!: FormControl;
  passwordFormControl!: FormControl;
  ValidationMessages = ValidationMessages;
  pattern = Pattern;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Pattern.email)]],
      password: [
        '',
        [Validators.required, Validators.pattern(Pattern.password)],
      ],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  get formData() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(this.loginForm.value);
  }
}
