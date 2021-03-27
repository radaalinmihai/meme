import { showMessage } from "react-native-flash-message";

const showSuccess = (message: string) =>
  showMessage({
    message: "Success",
    type: "success",
    duration: 3000,
    description: message,
  });

export default showSuccess;
