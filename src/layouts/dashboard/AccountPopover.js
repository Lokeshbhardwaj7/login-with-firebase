import React, { useRef, useState } from 'react';
import { useNavigate,Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';
import { logoutInitiate } from '../../redux/action';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------
//get display name from firebase auth user object (user.currentUser.displayName) and  or from localStorage (user.currentUser.displayName)
export default function AccountPopover() {
  const {currentUser} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {
    if(currentUser) {
      dispatch(logoutInitiate());
    }
  };
  const getDisplayName = (user) => {
    user = JSON.parse(user);
    if (user) {
      return user.displayName;
    }
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).displayName : null;
  }
  const getDisplayEmail = (user) => {
    user = JSON.parse(user);
    if (user) {
      return user.email;
    }
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : null;
  }
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
          {getDisplayName(useSelector(state => state.user.currentUser))}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {getDisplayEmail(useSelector(state => state.user.currentUser))}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleAuth} sx={{ m: 1 }}>
            
          Logout
   
        </MenuItem>
      </MenuPopover>
    </>
  );
}
