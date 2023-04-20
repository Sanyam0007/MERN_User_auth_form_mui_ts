import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link,useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  appBar: {
    zIndex: 9999,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    ['@media (min-width:600px)']: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: 16,
    ['@media (min-width:600px)']: {
      display: 'none',
    },
  },
  menuItems: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
    ['@media (max-width:600px)']: {
      display: 'none',
    },
  },
});

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar} style={{background:'linear-gradient(to right,blue,grey, black)'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        
        <div className={classes.menuItems}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/profile" color="inherit">Profile</Button>
          <Button component={Link} to="/about" color="inherit">About</Button>
          <Button component={Link} to="/community" color="inherit">Community</Button>
          <Button component={Link} to='/logout' color="inherit">Logout</Button>
        </div>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/about">About</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/community">Community</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={'/logout'}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
