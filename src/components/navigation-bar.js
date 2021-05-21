import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableTemporaryDrawer from './drawer';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [isDriverOpen, setDriverOpen] = React.useState(false);
  const [isAvatarShow, setAvatarShow] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDriverOpen(open);
  };

  return (
    <>        
        <div className={classes.root}>
          <SwipeableTemporaryDrawer state={isDriverOpen} toggleDrawer={toggleDrawer}/>
          <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(!isDriverOpen)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                {isAvatarShow ? <Avatar alt="cat" src="/catAvatar.jpg"/> : null}
                <Button color="inherit" onClick={() => setAvatarShow(!isAvatarShow)}>{isAvatarShow ? 'Logout' : 'Login'}</Button>
              </Toolbar>
          </AppBar>
        </div>
    </>
  );
}
