import { red } from "@mui/material/colors";
import { toast } from "react-toastify";

export const notify = (type, message) => {
  toast(message, {
    type,
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
