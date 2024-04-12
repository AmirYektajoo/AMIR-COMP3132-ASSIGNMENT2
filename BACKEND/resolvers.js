// Import Employee and User models
const EmployeeModel = require('./models/Employee');
const UserModel = require('./models/User');

// Define resolvers
exports.resolvers = {
    Query: {
        // Resolver to get all employees
        getEmployees: async () => {
            return await EmployeeModel.find({});
        },
        // Resolver to get employee by ID
        getEmployeeByID: async (_, args) => {
            try {
                return await EmployeeModel.findById(args.id);
            } catch (err) {
                if (!args.id) {
                    throw new Error('ID field cannot be empty');
                } else if (err.name === 'CastError') {
                    throw new Error('Invalid employee ID');
                }
                throw new Error('An error occurred while getting the employee');
            }
        },
        // Resolver for user login
        login: async (_, args) => {
            try {
                const user = await UserModel.findOne({ username: args.username });

                if (user && user.password === args.password) {
                    return `User ${user.username} logged in successfully`;
                } else {
                    return 'Invalid username or password';
                }
            } catch (err) {
                return JSON.stringify(err.message);
            }
        }
    },
    Mutation: {
        // Resolver to add a new employee
        addEmployee: async (_, args) => {
            try {
                const newEmployee = new EmployeeModel({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary,
                });
                return await newEmployee.save();
            } catch (err) {
                if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.salary) {
                    throw new Error('All fields must be filled');
                }
                if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    throw new Error(`Employee with ${duplicateKey} already exists`);
                } else if (err.name === 'ValidationError') {
                    if (err.errors.salary) {
                        throw new Error('Salary cannot be negative');
                    }
                    throw new Error('Invalid email format');
                } else {
                    throw new Error('An error occurred while adding the employee');
                }
            }
        },
        // Resolver to update an existing employee
        updateEmployee: async (_, args) => {
            // Validation for required fields
            if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.salary) {
                throw new Error('All fields must be filled');
            }
            try {
                return await EmployeeModel.findOneAndUpdate(
                    { _id: args.id },
                    { $set: { firstname: args.firstname, lastname: args.lastname, email: args.email, gender: args.gender, salary: args.salary } },
                    { new: true }
                );
            } catch (err) {
                if (!args.id || err.name === 'CastError') {
                    throw new Error('Employee does not exist');
                }
                if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    throw new Error(`Employee with ${duplicateKey} already exists`);
                } else {
                    throw new Error('An error occurred while updating the employee');
                }
            }
        },
        // Resolver to delete an employee
        deleteEmployee: async (_, args) => {
            if (!args.id) {
                throw new Error('ID field cannot be empty');
            }
            try {
                return await EmployeeModel.findByIdAndDelete(args.id);
            } catch (err) {
                if (err.name === 'CastError') {
                    throw new Error('Invalid employee ID');
                }
                throw new Error('An error occurred while deleting the employee');
            }
        },
        // Resolver to signup a new user
        signup: async (_, args) => {
            try {
                const newUser = new UserModel({
                    username: args.username,
                    email: args.email,
                    password: args.password
                });
                return await newUser.save();
            } catch (err) {
                if (!args.username || !args.password || !args.email) {
                    throw new Error('All fields must be filled');
                } else if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    throw new Error(`User with ${duplicateKey} already exists`);
                } else if (err.name === 'ValidationError') {
                    throw new Error('Invalid email format');
                } else {
                    throw new Error('An error occurred while signing up');
                }
            }
        }
    }
};
