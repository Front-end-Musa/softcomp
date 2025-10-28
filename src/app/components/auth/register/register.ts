import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersFacade } from '../../../data/users-data/users.facade';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usersFacade: UsersFacade, private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['wrestler', Validators.required],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        pfpUrl: ['', [Validators.pattern('https?://.+')]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const { password, confirmPassword } = form.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, role, firstName, lastName, pfpUrl } = this.registerForm.value;

    const user: User = {
      email,
      password,
      role,
      firstName,
      lastName,
      pfpUrl,
      createdAt: new Date()
    }

    try {
      await this.usersFacade.registerUser(user);
      this.router.navigate(['/events']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
