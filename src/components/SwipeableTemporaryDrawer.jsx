import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const menu = [
  {
    url: '/',
    text: 'Главная',
  },
  {
    url: '/converter',
    text: 'Конвертер картинок',
  }
];

export default function SwipeableTemporaryDrawer({ state, toggleDrawer, titleHeaderAppBar }) {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className={classes.list} onClick={toggleDrawer(false)}>
        <List>
          {menu.map((data, index) => (
            <ListItem 
              button 
              key={data.text} 
              component={Link} 
              href={data.url}
              selected={titleHeaderAppBar === data.text}
            >
                <ListItemText primary={data.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
}
