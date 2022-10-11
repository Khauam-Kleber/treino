import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  form;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private usersService: UsersService, private route: ActivatedRoute, private notificationService: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.usersService.userValue) {
      this.router.navigate(['/dashboard/default']);
    }

    this.criarForm();

  }

  criarForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
  }


  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // this.loading = true;
    this.usersService.login(this.form.get('email').value, this.form.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/default';
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          console.log(error)
          this.notificationService.showError("Usuario ou Senha não encontrado!");

        });
  }



}
