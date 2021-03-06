import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';
import DrawUser from './DrawUser.tsx';

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

export default function HeaderAppBar({titleHeaderAppBar}) {
  const classes = useStyles();

  const [isDriverOpen, setDriverOpen] = React.useState(false);
  const [isAvatarDraw, setAvatarDraw] = React.useState(false);

  const toggleDrawer = React.useCallback((event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDriverOpen((currentState) => !currentState);
  }, []);

  
  return (
    <>
      <div className={classes.root}>
        <SwipeableTemporaryDrawer state={isDriverOpen} toggleDrawer={toggleDrawer} titleHeaderAppBar={titleHeaderAppBar}/>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {titleHeaderAppBar}
            </Typography>
            {isAvatarDraw ? <DrawUser /> : null}
            <Button color="inherit" onClick={() => setAvatarDraw(!isAvatarDraw)}>{isAvatarDraw ? 'Выход' : 'Вход'}</Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
