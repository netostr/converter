import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function SwipeableTemporaryDrawer({state, toggleDrawer}) {
  const classes = useStyles();
 
  return (
    <SwipeableDrawer       
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
    >
        <div className={classes.list}></div>
    </SwipeableDrawer>
  );
}
