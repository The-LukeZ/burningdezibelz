/**
 * @param {DBModels.Location} location
 */
export function stringifyLocation(location, justStreet = false) {
  return (
    location.address + (justStreet ? "" : `${location.postalCode}, ${location.city} (${location.province}) - ${location.country}`)
  );
}
