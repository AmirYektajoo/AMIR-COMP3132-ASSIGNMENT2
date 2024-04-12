import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeService } from "../Service/employee.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      gender: ["", Validators.required],
      salary: [null, Validators.required],
    });
  }

  async addEmployee() {
    if (this.employeeForm.invalid) {
      this.errorMessage = "Please fill all required fields";
      return;
    }

    const { firstname, lastname, email, gender, salary } = this.employeeForm.value;

    if (!firstname.trim()) {
      this.errorMessage = "Firstname is required";
      return;
    }
    
    if (!lastname.trim()) {
      this.errorMessage = "Lastname is required";
      return;
    }
    
    if (!email.trim()) {
      this.errorMessage = "Email is required";
      return;
    }
    
    if (!gender.trim()) {
      this.errorMessage = "Gender is required";
      return;
    }
    
    if (!salary) {
      this.errorMessage = "Salary is required";
      return;
    }

    this.employeeService.addEmployee(firstname, lastname, email, gender, salary)
      .subscribe(
        () => {
          this.employeeForm.reset();
          this.successMessage = "Employee created successfully! Redirecting to the home page...";
          setTimeout(() => {
            this.router.navigate(["/homepage"]);
          }, 3000);
        },
        error => {
          this.errorMessage = error.message;
        }
      );
  }

  goToHomePage() {
    this.router.navigate(["/homepage"]);
  }
}
