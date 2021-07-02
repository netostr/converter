import React from 'react';
import Game from '../src/components/Game';
import HeaderAppBar from '../src/components/HeaderAppBar';

export default function Converter() {
  return (
    <>
      <HeaderAppBar titleHeaderAppBar="Крестики-нолики"/>
      <Game />
    </>
  );
}