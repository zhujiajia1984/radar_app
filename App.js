/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';
import ToastExample from './ToastExample';
import Imei from './Imei';

// const
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component < Props > {
    constructor(props) {
        super(props);
        this.state = {
            imei: '',
            imei2: ''
        };
    }
    // click
    onBtnClick() {
        // ToastExample.show('Awesome', ToastExample.SHORT);
        // Imei.getImei();
        // 权限获取
        this.requestCameraPermission().then(result => {
            let msg = "";
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                // 获取权限成功
                // msg = "获取IMEI权限成功";
                // ToastExample.show(msg, ToastExample.SHORT);
                Imei.getImei((error, code) => {
                    ToastExample.show(error, ToastExample.SHORT);
                }, (imei, imei2) => {
                    this.setState({ imei, imei2 });
                });
            } else {
                // 获取失败
                msg = "获取IMEI权限被拒绝";
                ToastExample.show(msg, ToastExample.SHORT);
            }
        });

    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, {
                    'title': '获取手机IMEI',
                    'message': '为了提供更好的服务' +
                        '需要获取手机IMEI号码.'
                }
            )
            return granted;
        } catch (err) {
            console.warn(err);
            return "";
        }
    }

    // render
    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.welcome}>Imei</Text>
              <Text style={styles.instructions}>imei1：{this.state.imei}</Text>
              <Text style={styles.instructions}>imei2：{this.state.imei2}</Text>
              <Button 
                title="Learn More"
                color="#000000"
                onPress={this.onBtnClick.bind(this)}
              />
           </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});