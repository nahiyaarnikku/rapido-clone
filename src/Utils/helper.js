export function calculateFare(distance, vehicleType, timeInMinutes = 0) {
    // Define fare structure
    const fareRates = {
        bike: {
            baseFare: 20, // Base fare for bike rides
            perKmRate: 10, // Rate per kilometer
            perMinuteRate: 2, // Optional: Per minute charge
        },
        auto: {
            baseFare: 30, // Base fare for auto rides
            perKmRate: 15, // Rate per kilometer
            perMinuteRate: 3, // Optional: Per minute charge
        },
    };

    // Get the rate structure for the vehicle type
    const rates = fareRates[vehicleType];

    if (!rates) {
        throw new Error("Invalid vehicle type");
    }

    // Calculate total fare
    const fare =
        rates.baseFare +
        distance * rates.perKmRate +
        timeInMinutes * rates.perMinuteRate;

    return fare.toFixed(2); // Round to 2 decimal places
}
