import { showMessage } from "react-native-flash-message";

const showError = (message: string) =>
  showMessage({
    duration: 3000,
    animated: true,
    type: "danger",
    message: "Error",
    description: message,
  });

export default showError;
