import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, styled, alpha, Avatar } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Mail as MailIcon, Notifications as NotificationsIcon, MoreVert as MoreIcon } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative', borderRadius: '20px', backgroundColor: alpha('#000', 0.05),
  marginRight: theme.spacing(2), width: '100%', [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit', '& .MuiInputBase-input': { padding: theme.spacing(1, 1, 1, 5), width: '100%', [theme.breakpoints.up('md')]: { width: '25ch' } },
}));

export default function Navbar() {
  const [anchor, setAnchor] = useState({ profile: null, mobile: null });
  const IMG = "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp";
  const closeAll = () => setAnchor({ profile: null, mobile: null });
  const Icons = ({ mobile = false }) => (
    <>
      <IconButton size="large" color="inherit"><Badge badgeContent={4} color="primary"><MailIcon /></Badge>{mobile && <p className="ms-3 m-0">Messages</p>}</IconButton>
      <IconButton size="large" color="inherit"><Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>{mobile && <p className="ms-3 m-0">Alerts</p>}</IconButton>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: 'white', color: '#333', boxShadow: 1, left: 0, right: 0 }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}><MenuIcon /></IconButton>
          <Search>
            <Box sx={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', pl: 2, color: 'gray' }}><SearchIcon /></Box>
            <StyledInput placeholder="Search..." />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Icons />
            <Box sx={{ ml: 2, pl: 2, borderLeft: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>Admin</Typography>
              <IconButton onClick={(e) => setAnchor({ ...anchor, profile: e.currentTarget })} sx={{ p: 0 }}>
                <Avatar src={IMG} sx={{ width: 35, height: 35, border: '1px solid #ddd' }} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={(e) => setAnchor({ ...anchor, mobile: e.currentTarget })} color="inherit"><MoreIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* Profile Menu */}
      <Menu anchorEl={anchor.profile} open={Boolean(anchor.profile)} onClose={closeAll} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MenuItem onClick={closeAll}>Profile</MenuItem>
        <MenuItem onClick={closeAll} sx={{ color: 'red' }}>Logout</MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu anchorEl={anchor.mobile} open={Boolean(anchor.mobile)} onClose={closeAll} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem><Icons mobile /></MenuItem>
        <MenuItem onClick={(e) => setAnchor({ ...anchor, profile: e.currentTarget })}>
            <Avatar src={IMG} sx={{ width: 25, height: 25, mr: 2 }} />
            <p className="m-0">Profile</p>
        </MenuItem>
      </Menu>
    </Box>
  );
}