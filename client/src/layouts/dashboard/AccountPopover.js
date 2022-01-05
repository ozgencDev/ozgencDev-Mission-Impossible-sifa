import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
//
import account from "../../_mocks_/account";

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false); //set state to showing modal
  const [user, setUser] = useState(); //set state to user data

  useEffect(() => {
    let userLS = JSON.parse(localStorage.getItem("user")); //get user data from local storage
    if (userLS) { //if user data is not empty
      setUser(userLS); //set user data to state
    }
  }, []);

  const handleOpen = () => {
    setOpen(true); //set state to showing modal
  };
  const handleClose = () => {
    setOpen(false);   //set state to hiding modal
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user"); //if user logout remove user data from local storage
    navigate('/login'); //navigate to login page
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user && user.name + " " + user.surname}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user && user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => {logout()}}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
