const mongoose = require('mongoose');

// Define the schema for the Employee model
const EmployeeSchema = new mongoose.Schema({
  // Define schema for first name field
  firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true
  },
  // Define schema for last name field
  lastname: {
    type: String,
    alias: 'surname',
    required: true,
    trim: true
  },
  // Define schema for email field
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    maxlength: 50,
    // Custom validation for email format
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  // Define schema for gender field
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
    trim: true,
    lowercase: true
  },
  // Define schema for salary field
  salary: {
    type: Number,
    default: 0.0,
    // Validation to prevent negative salary values
    validate(value) {
      if (value < 0.0){
         throw new Error("Negative Salary values are not allowed.");
      }
    }
  },
  // Define schema for creation date field
  created: { 
    type: Date,
    default: Date.now,
    alias: 'createdat'
  },
  // Define schema for last updated date field
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

// Create the Employee model based on the schema
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

// Export the Employee model
module.exports = EmployeeModel;
