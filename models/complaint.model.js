import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        // Student who submitted the complaint
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
           
        },

        // Complaint title
        title: {
            type: String,
            
            trim: true
        },


         // Complaint category
         category: {
            type: String,
           
            enum: [
                "Academic",
                "Hostel",
                "Transport",
                "Library",
                "Fees",
                "IT",
                "Administration",
                "Other"
            ]
        },

        // Complaint description
        description: {
            type: String,
         
            trim: true
        },

       

        // Complaint status
        status: {
            type: String,
            enum: [
                "Pending",

                "Resolved",
                "Rejected"
            ],
            default: "Pending"
        },

        // Admin response
        adminResponse: {
            type: String,
            default: "",
            trim: true
        },

        // Date when complaint was raised
        createdAt: {
            type: Date,
            default: Date.now
        },
     
        // Date when complaint was resolved
        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;