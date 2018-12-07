import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Font } from 'expo';

export default class Fonts extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
      await Font.loadAsync({
        'Nunito': require('../../assets/fonts/Nunito/Nunito-Regular.ttf'),
        'NunitoSemiBold': require('../../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
        'NunitoBold': require('../../assets/fonts/Nunito/Nunito-Bold.ttf'),
        'NunitoExtraBold': require('../../assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
        'NunitoBoldItalic': require('../../assets/fonts/Nunito/Nunito-BoldItalic.ttf'),
      });

      this.setState({ fontLoaded: true });
    }

    render() {
      return this.state.fontLoaded ? this.props.children : null;
    }
}
