export interface GeocodingResponse {
  address?: Address;
  displayName?: string;
}

export interface Address {
  region?: string;
  town?: string;
  country?: string;
  postcode?: string;
  state?: string;
}

export async function getLocationFromAddress(
  latitude: number,
  longitude: number
): Promise<GeocodingResponse> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    {
      headers: {
        "User-Agent": "Hacienda App",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch location from address");
  }
  const data = await response.json();
  console.log(data)
  return {
    address: data.address,
    displayName: data.display_name,
  };
}
