//Check the Role is ADMIN or USER
import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decode = jwtDecode(token);
    return decode.role;
  } catch (error) {
    console.log("Invalid token");
    return null;
  }
};
