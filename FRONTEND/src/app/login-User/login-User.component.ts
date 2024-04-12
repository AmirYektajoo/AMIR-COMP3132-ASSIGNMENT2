import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeService } from "../Service/employee.service";

@Component({
  selector: "app-login",
  templateUrl: "./login-User.component.html",
  styleUrls: ["./login-User.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Invalid form data.";
      return;
    }

    const { username, password } = this.loginForm.value;

    this.employeeService.login(username, password).subscribe((result: any) => {
      if (result.data.login === "Invalid username or password") {
        this.errorMessage = "Invalid username or password";
      } else {
        this.router.navigate(["/homepage"]);
      }
    });
  }

  SignupUser(event: Event) {
    event.preventDefault();
    this.employeeService.SignupUser();
  }
}
