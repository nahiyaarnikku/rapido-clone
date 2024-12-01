const mongoose = require('mongoose');

const rideSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true },
    status: { type: String, default: 'pending' },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    distance: { type: String, required: true },
    price: { type: Number, required: true },
    paymentMethod: { type: String, default: 'pending' }, // cash, card, or QR
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
