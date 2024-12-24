export const handleServiceCall = (hass, feature) => {
  if (!feature.entity_id || !feature.service) return;
  
  const [domain, service] = feature.service.split(".");
  hass.callService(domain, service, {
    entity_id: feature.entity_id,
    ...feature.service_data
  });
};