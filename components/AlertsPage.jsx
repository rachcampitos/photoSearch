import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { removeAlert } from "@/redux/actions/alertActions";

const AlertsPage = () => {
  const alerts = useSelector((state) => state.alerts.alerts);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      {alerts.map((alert) => (
        <View key={alert.id} style={styles.alertContainer}>
          <Text style={styles.alertText}>{alert.message}</Text>
          <Button
            title="Dismiss"
            onPress={() => dispatch(removeAlert(alert.id))}
            color="#065f46"
          />
        </View>
      ))}
    </View>
  );
};

export default AlertsPage;

const styles = StyleSheet.create({
  alertContainer: {
    padding: 16, // p-4 (assuming 1 unit is 4 in your scale)
    margin: 16, // m-4
    marginBottom: 8, // mb-2
    borderRadius: 12, // rounded-lg
    backgroundColor: "#f0fdf4", // bg-green-50
    flexDirection: "row", // flex-row
    justifyContent: "space-between", // justify-between
  },
  alertText: {
    color: "#065f46", // text-green-800
    textTransform: "capitalize",
    fontSize: 18, // text-lg
    position: "relative",
    top: 4, // top-1 (assuming 1 unit is 4)
  },
});
