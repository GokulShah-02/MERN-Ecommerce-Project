import React, {Fragment, useState, useEffect} from "react";
import {useAlert} from "react-alert";
import {useSelector, useDispatch} from "react-redux";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import FaceIcon from '@mui/icons-material/Face';
import {useNavigate} from "react-router-dom";

import ProfilePic from "../../images/Profile.png";
import Loader from "../layout/Loader/Loader";
import "./UpdateProfile.css";
import {updateProfile, clearErrors, loadUser} from "../../actions/userActions";
import {UPDATE_PROFILE_RESET} from "../../constants/userConstants";
import MetaData from "../layout/MetaData/MetatData";

function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.user);
  const {error, isUpdated, loading} = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(ProfilePic);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
      if(user.avatar !== undefined && user.avatar.url)
        setAvatarPreview(user.avatar.url)
    }
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET
      });
      navigate("/account", {replace: true});
    }
  }, [dispatch, error, alert, isUpdated, user, navigate]);

  return(
    <Fragment>
      {loading ? (
        <Loader />
        ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile;
