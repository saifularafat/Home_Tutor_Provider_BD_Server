const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        minlength: [3, "The length of user name can be minimum 3 character"],
        maxlength: [31, "The length of user name can be maximum 31 character"],
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minlength: [8, "The length of user password must be at least 8 characters"],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }
    },
    phone: {
        type: String,
        required: [true, "user phone is required"],
        validate: {
            validator: function (v) {
                return /^(\+8801|8801|01)[3-9]\d{8}$/.test(v);
            },
            message: "Please enter a valid phone number"
        },
    },
    address: {
        type: String,
        required: [true, "user Address is required"],
        minlength: [3, "The length of user Address can be minimum 3 character"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        message: "Gender must be Male, Female, or Other"
    },
    image: {
        type: Buffer,
        contentType: String,
        required: [true, "User Image is required"],
    },
    nidBirth: {
        type: Buffer,
        contentType: String,
        required: [true, "User Nid cart is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isTutor: {
        type: Boolean,
        default: false
    },
    isParent: {
        type: Boolean,
        default: false
    },
    isCoaching: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })



// Pre-save hook to hash password
userSchema.pre("save", async (next) => {
    console.log("Password modified:", this.isModified("password"));
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        console.log("Password hashed successfully");
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error); // Pass error to the save process
    }
});


const User = model("Users", userSchema)

module.exports = User;