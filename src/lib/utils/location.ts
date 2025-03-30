export function stringifyLocation(location: DBModels.Location, justStreet = false) {
  return (
    location.address + (justStreet ? "" : `${location.postalCode}, ${location.city} (${location.province}) - ${location.country}`)
  );
}
