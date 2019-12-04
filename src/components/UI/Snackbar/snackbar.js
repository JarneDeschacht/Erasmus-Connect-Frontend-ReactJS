import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import * as actions from "../../../store/actions/index";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

const SnackbarComponent = props => {
  const dispatch = useDispatch();

  const onShowConfirmation = useCallback(
    () => dispatch(actions.clearConfirmationMessage()),
    [dispatch]
  );
  const onShowConnectionError = useCallback(
    () => dispatch(actions.clearConnectionError()),
    [dispatch]
  );
  const onShowAuthError = useCallback(
    () => dispatch(actions.clearErrorsAuth()),
    [dispatch]
  );
  const onShowStudentConfirmation = useCallback(
    () => dispatch(actions.clearStudentConfirmationMessage()),
    [dispatch]
  );

  const confirmMessage = useSelector(state => state.auth.confirmationMessage);
  const connectionError = useSelector(state => state.student.connectionError);
  const authError = useSelector(state => state.auth.error);
  const forgotPasswordError = useSelector(state => state.auth.forgotPasswordError);
  const updatePasswordError = useSelector(state => state.auth.updatePasswordError);
  const studentConfirmationMessage = useSelector(state => state.student.confirmationMessage);

  const [open, setOpen] = React.useState(true);
  const [variant, setVariant] = React.useState("success");
  const [message, setMessage] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (variant === "success")
      onShowConfirmation();
      onShowStudentConfirmation();
    if (variant === "error") {
      onShowConnectionError();
      onShowAuthError();
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(confirmMessage !== null);
    setVariant("success");
    setMessage(confirmMessage);
  }, [confirmMessage]);

  useEffect(() => {
    setOpen(studentConfirmationMessage !== null);
    setVariant("success");
    setMessage(studentConfirmationMessage);
  }, [studentConfirmationMessage]);

  useEffect(() => {
    setOpen(connectionError !== null);
    setVariant("error");
    setMessage(connectionError);
  }, [connectionError]);

  useEffect(() => {
    setOpen(authError !== null || forgotPasswordError !== null || updatePasswordError !== null);
    setVariant("error");
    if (authError !== null)
      setMessage(authError);
    else if (forgotPasswordError !== null)
      setMessage(forgotPasswordError);
    else if (updatePasswordError !== null)
      setMessage(updatePasswordError);
  }, [authError, forgotPasswordError, updatePasswordError]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
