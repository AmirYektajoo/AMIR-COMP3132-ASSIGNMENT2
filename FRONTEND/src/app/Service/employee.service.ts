import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Router } from "@angular/router";
import { Employee } from "../models/employee";

@Injectable({
  providedIn: "root", // Specifies that the service should be provided at the root level
})
export class EmployeeService {
  selectedEmployee_: any; // Property to store the selected employee
  selectedEmployee: Employee | null = null;
  private isViewMode: boolean = false;

  setIsViewMode(viewMode: boolean) {
    this.isViewMode = viewMode;
  }

  getIsViewMode() {
    return this.isViewMode;
  }

  // Method to set the selected employee
  constructor(private apollo: Apollo, private router: Router) {}

  setSelectedEmployee(employee: any) {
    this.selectedEmployee_ = employee;
  }

  // Service method for fetching employees from GraphQL
  getEmployees() {
    return this.apollo.query({
      query: gql`
        query {
          getEmployees {
            id
            firstname
            lastname
            email
            gender
            salary
          }
        }
      `,
      fetchPolicy: "network-only",
    });
  }

  // Service method for adding an employee
  addEmployee(
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    salary: number
  ) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          addEmployee(
            firstname: "${firstname}",
            lastname: "${lastname}",
            email: "${email}",
            gender: "${gender}",
            salary: ${salary}
          ) {
            id
            firstname
            lastname
            email
            gender
            salary
          }
        }
      `,
    });
  }

  // Service method for updating an employee
  updateEmployee(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    salary: number | null
  ) {
    const salaryQuery = salary ? `salary: ${salary}` : "";
    const mutationQuery = `
    mutation {
      updateEmployee(
        id: "${id}",
        firstname: "${firstname}",
        lastname: "${lastname}",
        email: "${email}",
        gender: "${gender}",
        ${salaryQuery}
      ) {
        id
        firstname
        lastname
        email
        gender
        salary
      }
    }
  `;
    return this.apollo.mutate({
      mutation: gql`
        ${mutationQuery}
      `,
    });
  }

  // Service method for deleting an employee
  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        deleteEmployee(id: "${id}") {
          id
        }
      }
    `,
      fetchPolicy: "network-only",
    });
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          signup(
            username: "${username}",
            email: "${email}",
            password: "${password}"
          ) {
            username
            email
          }
        }
      `,
    });
  }

  // Service method for user login
  login(username: string, password: string) {
    return this.apollo.query({
      query: gql`
          query {
            login(username: "${username}", password: "${password}")
          }
        `,
    });
  }

  LoginUser() {
    this.router.navigate(["/"]);
  }

  SignupUser() {
    this.router.navigate(["/signup"]);
  }


  AddEmployee() {
    this.router.navigate(["/Add-New-Employee"]);
  }

  DisplayEmployee() {
    this.router.navigate(["/Display-Employee"]);
  }



  UpdateEmployeeUser(employee: Employee) {
    this.selectedEmployee = employee;
    this.router.navigate(["/update-employee"]);
  }

  BackHomePage() {
    this.router.navigate(["/homepage"]);
  }

  getSelectedEmployee() {
    return this.selectedEmployee;   
  }
}
