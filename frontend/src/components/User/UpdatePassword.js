import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate} from "react-router-dom";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';

import { clearErrors, updatePassword } from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import "./UpdatePassword.css";
import MetaData from "../../components/layout/MetaData/MetatData";

function UpdatePassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });

      navigate("/account", {replace: true});
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <Paper
                    elevation={0}
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    sx={{position: "absolute", right: "10px"}} >
                  { showOldPassword ?
                    <VisibilityIcon
                    /> :
                    <VisibilityOffIcon
                    />
                  }
                  </Paper>
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdatePassword;
