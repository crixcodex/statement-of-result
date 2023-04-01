import { createTheme } from "@mui/material";
import Swal from "sweetalert2";

export const theme = createTheme({
  primary: {
    light: "#0d6efd",
    main: "#0d6efd",
    dark: "#000000",
    // contrastText: will be calculated to contrast with palette.primary.main
  },
});

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
