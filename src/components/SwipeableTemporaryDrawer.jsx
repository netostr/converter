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
    text: 'Ковертер',
  }
];

export default function SwipeableTemporaryDrawer({ state, toggleDrawer }) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (index) => () => {
    setSelectedIndex(index);
  };

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
              selected={selectedIndex === index}
              onClick={handleListItemClick(index)}
            >
                <ListItemText primary={data.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
}
