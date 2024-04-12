import { Component } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeService } from "../Service/employee.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup-User.component.html",
  styleUrls: ["./signup-User.component.css"],
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  errorMessage!: string;
  successMessage!: string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  async signup() {
    const { username, email, password } = this.signupForm.value;

    // Check if username, email, and password are valid strings
    if (
      !username ||
      typeof username !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      this.errorMessage = "Invalid form data.";
      return;
    }

    // Check if email is valid
    if (!this.signupForm.controls["email"].valid) {
      this.errorMessage = "Please enter a valid email address.";
      return;
    }

    // Check if password is valid
    if (!this.signupForm.controls["password"].valid) {
      this.errorMessage = "Please enter a valid password.";
      return;
    }

    await this.employeeService.signup(username, email, password).subscribe(
      (result) => {
        // set the success message and clear the form
        this.signupForm.reset();
        this.errorMessage = "";
        this.successMessage =
          "Account created successfully! Redirecting to the login page...";
        // redirect to the login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 3000);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  LoginUser(event: Event) {
    this.employeeService.LoginUser();
  }
}
