import Avatar from '@material-ui/core/Avatar';
import React from 'react';

function DrawUser() {
  const User = {
    login: 'login',
    avatar: '/catAvatar.jpg',
    name: 'Testovich',
  };

  return (
    <Avatar alt={User.name} src={User.avatar} />
  );
}

export default DrawUser;
