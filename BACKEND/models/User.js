// Import required modules
const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  // Define schema for username field
  username: {
    type: String,
    required: [true, 'Please enter username'],
    trim: true,
    unique: [true, 'Username already exists']
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
  // Define schema for password field
  password: {
    type: String,
    required: true,
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

// Create the User model based on the schema
const UserModel = mongoose.model("User", UserSchema);

// Export the User model
module.exports = UserModel;
