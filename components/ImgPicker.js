import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {

   const [pickedImg, setpPickedImg] = useState();

   const verifyPermissions = async () => {
      const PermissionReq = await Permissions.askAsync(
         Permissions.CAMERA,
         Permissions.CAMERA_ROLL,
      );
      if (PermissionReq.status !== 'granted') {
         Alert.alert('Camera Permissions Deny', 'You need allow permissions to using the App!', [{ text: 'OK' }]);
         return false;
      }
      return true;
   }

   const pickImgHandler = async () => {
      const hasPermissions = await verifyPermissions();
      if (!hasPermissions) { return; }
      const image = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         aspect: [16, 9],
         quality: 0.5,
      });
      setpPickedImg(image.uri);
      props.onImgTaken(image.uri)
   };

   return (
      <View style={styles.imgPicker} >
         <View style={styles.imgPreview} >
            {!pickedImg ?
               <Text>No image selected yet.</Text> :
               <Image style={styles.img} source={{ uri: pickedImg }} resizeMode='stretch' />
            }
         </View>
         <Button title='Take Image' onPress={pickImgHandler} color={Colors.pastelpink} />
      </View>
   )
}

const styles = StyleSheet.create({
   imgPicker: {
      // alignItems: 'center',
      marginBottom: 15,
   },
   imgPreview: {
      width: '100%',
      height: 200,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: Colors.pastelpink,
      borderWidth: 3,
   },
   img: {
      width: '100%',
      height: '100%',
      borderColor: Colors.pastelpink,
      borderWidth: 3,
   }
});

export default ImgPicker;
