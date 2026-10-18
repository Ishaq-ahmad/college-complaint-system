import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 3 && value.length > 15) {
          throw new Error("Name must be between 3 and 15 characters.");
        }
      },


    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    
      
    },

    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
       
    
      },
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;



