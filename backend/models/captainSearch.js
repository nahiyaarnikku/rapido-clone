const fetchCaptain = async () => {
    setIsSearching(true);
    setError(null);
  
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || '';
      const url = `${baseUrl}/api/captains/nearby?rideType=${encodeURIComponent(rideType)}&pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch captains: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
  
      if (data.captains && data.captains.length > 0) {
        const foundCaptain = data.captains[0];
        setCaptain({
          name: foundCaptain.name,
          rating: foundCaptain.rating,
          totalRides: foundCaptain.totalRides,
          vehicleNumber: foundCaptain.vehicleNumber,
          phoneNumber: foundCaptain.phoneNumber,
        });
        setCaptainLocation(foundCaptain.location);
      } else {
        setCaptain(null);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching captain details.');
    } finally {
      setIsSearching(false);
    }
  };
  