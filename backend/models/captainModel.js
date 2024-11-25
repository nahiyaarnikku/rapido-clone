const mongoose = require('mongoose');

const captainSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        wallet: {
            type: Number,
            default: 0,
        },
        approvedRides: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ride',
            },
        ],
        rating: {
            type: Number,
            default: 0,
        },
        // New vehicle details added here
        vehicleDetails: {
            type: {
                type: String, // 'auto' or 'bike'
                required: true,
                enum: ['auto', 'bike'], // Vehicle type must be auto or bike
            },
            vehicleNumber: {
                type: String,
                required: true,
                unique: true, // Vehicle number should be unique
            },
            vehicleModel: {
                type: String,
                required: true, // Vehicle model is required
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Captain', captainSchema);
