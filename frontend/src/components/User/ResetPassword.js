import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useNavigate, useParams} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';

import MetaData from "../layout/MetaData/MetatData";
import Loader from "../layout/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userActions";
import "./ResetPassword.css";

function ResetPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let {token} = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login", {replace: true});
    }
  }, [dispatch, error, alert, navigate, success]);

  return(
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Paper
                    elevation={0}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{position: "absolute", right: "10px"}} >
                  { showNewPassword ?
                    <VisibilityIcon
                    /> :
                    <VisibilityOffIcon
                    />
                  }
                  </Paper>
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Paper
                    elevation={0}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{position: "absolute", right: "10px"}} >
                  { showConfirmPassword ?
                    <VisibilityIcon
                    /> :
                    <VisibilityOffIcon
                    />
                  }
                  </Paper>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword;
