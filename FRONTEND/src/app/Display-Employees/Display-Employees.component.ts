import { Component, OnInit } from "@angular/core";
import { Employee } from "../models/employee";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "../Service/employee.service";

@Component({
  selector: "app-employees",
  templateUrl: "./Display-employees.component.html",
  styleUrls: ["./Display-employees.component.css"],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  showDialog = false;
  showDeleteDialog = false;


  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployees(); 
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(({ data }) => {
      this.employees = (data as any).getEmployees;
    });
  }

  deleteEmployee() {
    if (!this.selectedEmployee) return;
    this.employeeService
      .deleteEmployee(this.selectedEmployee.id)
      .subscribe(() => {
        this.employees = this.employees.filter(
          (employee) => employee.id !== this.selectedEmployee!.id
        );
        this.showDeleteDialog = false;
      });
  }

  RedirectToLogin(event: Event) {
    event.preventDefault();
    this.employeeService.LoginUser();
  }

  AddEmployee(event: Event) {
    event.preventDefault();
    this.employeeService.AddEmployee();
  }

  RDisplayEmployee(event: Event) {
    event.preventDefault();
    this.employeeService.DisplayEmployee();
  }



  RUpdateEmployee(event: Event, employee: Employee) {
    this.employeeService.setIsViewMode(false);  
    this.employeeService.UpdateEmployeeUser(employee);
    event.preventDefault();
  }

 
  DisplayOneEmployee(event: Event, employee: Employee) {
    this.employeeService.setIsViewMode(true); // Set view mode to true
    this.employeeService.UpdateEmployeeUser(employee);
    event.preventDefault();
    this.router.navigate(["/update-employee"]);
  }

}
