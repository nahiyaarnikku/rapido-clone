const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        approvedRides: {
            type: Number,
            default: 0,
        },
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
captainSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    // if (enteredPassword === this.password) return true;
    // else return false;
};

captainSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Captain', captainSchema);
