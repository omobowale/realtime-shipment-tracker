import React from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

// Define types for the props
interface CustomSnackBarProps {
  onClose: () => void;
  isOpen: boolean;
  message: string;
  isError: boolean;
}

const CustomSnackBar: React.FC<CustomSnackBarProps> = ({
  onClose,
  isOpen,
  message,
  isError,
}) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
      sx={{ zIndex: "100002", opacity: "0.9" }}
    >
      <Alert
        onClose={onClose}
        severity={isError ? "warning" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
