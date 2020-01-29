import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import *  as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'
import Styles from './../../../Styles'
import { translate } from '../../../locales';
import { Ionicons } from '@expo/vector-icons'
 
export default class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null
  };

  static navigationOptions = {
      header : null
  }

  async componentDidMount () {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      this.setState({
        hasCameraPermission: status === 'granted',
      });
    }
  }

  _requestCameraPermission = async  () => {

  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      if(result.data.includes('c0d3l1n3::')){
        var hash = result.data.replace('c0d3l1n3::','');
        this.props.navigation.navigate('result',{
          hash : hash
        })
      } else {
        alert(translate('invalid'))
      }
    }
  };

  render() {
    return (
      <View style={Styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeScanned={this._handleBarCodeRead}    
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={Styles.bottomBar}>
        <TouchableOpacity style={Styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={Styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={Styles.cancelButtonText}>
            {translate('cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}