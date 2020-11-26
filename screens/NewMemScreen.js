import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, Button, View, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import * as memActions from '../store/mem-action';
import ImgPicker from '../components/ImgPicker';
import LoactionPicker from '../components/LoactionPicker';
import Colors from '../constants/Colors';

const NewMemScreen = props => {

   const dispatch = useDispatch();
   const [titleValue, setTitleValue] = useState('');
   const [image, setImage] = useState();
   const [location, setLocation] = useState();

   const titleChangeHandler = txt => {
      setTitleValue(txt)
   }

   const ImgTakenHandler = imgPath => {
      setImage(imgPath);
   }

   const LocationPickedHandler = useCallback(location => {
      console.log(location);
      setLocation(location);
   }, []);

   const saveHandler = () => {
      dispatch(memActions.addMem(titleValue, image,location));
      props.navigation.goBack();
   }

   return (
      <ScrollView>
         <View style={styles.form} >
            <Text style={styles.lbl} >Title</Text>
            <TextInput style={styles.input} onChangeText={titleChangeHandler} value={titleValue} />
            <ImgPicker onImgTaken={ImgTakenHandler} />
            <LoactionPicker navigation={props.navigation} onLocationPicked={LocationPickedHandler} />
            <Button title='Save Memory' color={Colors.header} onPress={saveHandler} />
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   form: {
      margin: 30,
   },
   lbl: {
      fontSize: 20,
      marginBottom: 25,
   },
   input: {
      borderBottomColor: Colors.silver,
      borderBottomWidth: 2,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      color: Colors.darkpink
   }
});

export default NewMemScreen;