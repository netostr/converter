import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import NLink from 'next/link';
import {useRouter} from 'next/router';

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
  },
  {
    url: '/tic-tac-toe',
    text: 'Крестики-нолики',
  }
];

export default function SwipeableTemporaryDrawer({ state, toggleDrawer, titleHeaderAppBar }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <SwipeableDrawer
      open={state}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
    >
      <div className={classes.list} onClick={toggleDrawer}>
        <List>
          {menu.map((data) => (
            <NLink href={data.url} passHref key={data.url}>
              <ListItem 
                button 
                key={data.text}
                component={Link}
                selected={router.pathname === data.url}
              >
                <ListItemText primary={data.text} />
              </ListItem>
            </NLink>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
}
