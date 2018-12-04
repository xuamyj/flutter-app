import React from 'react';

import { Font } from 'expo';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'FlutterIcons');

export default class FlutterIcon extends React.Component {
  state = {
    fontLoaded: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'FlutterIcons': require('../../assets/fonts/icomoon.ttf')
    });

    this.setState({fontLoaded: true});
  }
  render() {
    if (!this.state.fontLoaded) { return null;}

    return (
      <Icon name={this.props.iconName} size={24} color={this.props.tintColor}/>
    );
  }
}
