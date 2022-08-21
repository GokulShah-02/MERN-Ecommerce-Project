import React, {Fragment} from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Backdrop from '@mui/material/Backdrop';
import {useNavigate} from "react-router-dom";

import {logout} from "../../../actions/userActions";
import ProfilePic from "../../../images/Profile.png";
import "./userOptions.css";

function UserOptions(props) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {cartItems} = useSelector(state => state.cart);

  function dashboard() {
    navigate("/dashboard", {replace: true});
  }

  function orders() {
    navigate("/orders", {replace: true});
  }

  function account() {
    navigate("/account", {replace: true});
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  function cart() {
    navigate("/cart", {replace: true});
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Backdrop open={open}/>
      <Tooltip title="Account settings" sx={{padding: "0"}}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width:30, height:30}}>{props.user.name.charAt(0)}</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {props.user.role === "admin" &&
          <MenuItem onClick={dashboard}>
          <Avatar><DashboardIcon /></Avatar> <Typography gutterBottom>Dashboard</Typography>
          </MenuItem>
        }
        <MenuItem onClick={account}>
          <Avatar>
            <img
              className="speedDialIcon"
              src={props.user.avatar ? props.user.avatar.url : ProfilePic}
              alt="P"
            />
          </Avatar>
          <Typography gutterBottom>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={cart}>
          <Avatar><ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}} /></Avatar>
          <Typography gutterBottom>Cart ({cartItems.length})</Typography>
        </MenuItem>
        <MenuItem onClick={orders}>
          <Avatar><ListAltIcon /></Avatar>
          <Typography gutterBottom>My Orders</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutUser}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography gutterBottom>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default UserOptions;
