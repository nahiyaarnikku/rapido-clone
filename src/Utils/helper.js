export function calculateFare(distance, vehicleType, timeInMinutes = 0) {
    const fareRates = {
      bike: {
        baseFare: 10, // Base fare for bike rides
        perKmRate: 5, // Rate per kilometer
        perMinuteRate: 0.5, // Optional: Per minute charge
      },
      auto: {
        baseFare: 20, // Base fare for auto rides
        perKmRate: 10, // Rate per kilometer
        perMinuteRate: 0.5, // Optional: Per minute charge
      },
    };
  
    const rates = fareRates[vehicleType];
    if (!rates) {
      throw new Error('Invalid vehicle type');
    }
  
    const fare =
      rates.baseFare +
      distance * rates.perKmRate +
      timeInMinutes * rates.perMinuteRate;
  
    return fare.toFixed(2); // Round to 2 decimal places
  }
  