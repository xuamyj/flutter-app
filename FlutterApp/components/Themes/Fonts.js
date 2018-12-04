import React from 'react';

import { Font } from 'expo';

export default class Fonts extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'nunito': require('../../assets/fonts/Nunito/Nunito-Regular.ttf'),
      'open-sans': require('../../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    });
  }
}
