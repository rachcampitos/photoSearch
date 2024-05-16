// reducers/alertReducer.js

const initialState = {
  alerts: [],
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ALERT":
      return {
        ...state,
        alerts: [
          ...state.alerts,
          { ...action.payload, id: new Date().getTime() },
        ],
      };
    case "REMOVE_ALERT":
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
};

export default alertReducer;
