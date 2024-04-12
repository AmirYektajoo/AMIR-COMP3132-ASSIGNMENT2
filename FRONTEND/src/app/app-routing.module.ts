import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login-User/login-User.component";
import { SignupComponent } from "./signup-User/signup-User.component";
import { EmployeesComponent } from "./Display-Employees/Display-Employees.component";
import { AddEmployeeComponent } from "./Add-Employee/Add-Employee.component";
import { UpdateEmployeeComponent } from "./Update-employees/Update-employees.component";

// Define routes for different components
const routes: Routes = [
  { path: "", component: LoginComponent }, // Default route to LoginComponent
  { path: "signup", component: SignupComponent }, // Route to SignupComponent
  { path: "homepage", component: EmployeesComponent }, // Route to EmployeesComponent
  { path: "new-employee", component: AddEmployeeComponent }, // Route to AddEmployeeComponent
  { path: "update-employee", component: UpdateEmployeeComponent }, // Route to UpdateEmployeeComponent
];

@NgModule({
  // Importing RouterModule and configuring routes
  imports: [RouterModule.forRoot(routes)],
  // Exporting RouterModule to make router directives available for use in the AppModule components
  exports: [RouterModule],
})
export class AppRoutingModule {}
