export const addAlert = (alert) => ({
  type: "ADD_ALERT",
  payload: alert,
});

export const removeAlert = (alertId) => ({
  type: "REMOVE_ALERT",
  payload: alertId,
});
