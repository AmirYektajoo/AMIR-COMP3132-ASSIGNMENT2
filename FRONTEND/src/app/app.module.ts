import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache } from "@apollo/client/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login-User/login-User.component";
import { SignupComponent } from "./signup-User/signup-User.component";
import { EmployeesComponent } from "./Display-Employees/Display-Employees.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddEmployeeComponent } from "./Add-Employee/Add-Employee.component";
import { UpdateEmployeeComponent } from "./Update-employees/Update-employees.component";

// Define Apollo GraphQL URI
const uri = "http://localhost:4000/graphql";

@NgModule({
  declarations: [
    // Declaring components
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    // Importing Angular modules
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // Providing Apollo options with dynamic URI
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: uri,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent], // Bootstrapping the AppComponent
})
export class AppModule {}
