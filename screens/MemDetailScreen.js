import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';



const MemDetailScreen = props => {

   const memId = props.navigation.getParam('memId');
   const selectedMEM = useSelector(s => s.memories.memories.find(m => m.id === memId));

   const selectedlocation = { lat: selectedMEM.lat, lng: selectedMEM.lng };

   const showMapHandler = () => {
      props.navigation.navigate('Map',{readonly: true, initLocation: selectedlocation})
   }

   return (
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
         <Image style={styles.image} source={{ uri: selectedMEM.imageUri }} />
         <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedMEM.title}</Text>
         </View>
         <View style={styles.locationContainer} >
            <View style={styles.addressContainer}>
               <Text style={styles.address}>{selectedMEM.address}</Text>
            </View>
            <MapPreview style={styles.mapPreview} location={selectedlocation} onClick={showMapHandler} />
         </View>
      </ScrollView>

   )
}

MemDetailScreen.navigationOptions = navData => {
   return {
      headerTitle: navData.navigation.getParam('memTitle'),
   };
}

const styles = StyleSheet.create({
   image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
   },
   locationContainer: {
      marginVertical: 20,
      width: '90%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10
   },
   titleContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10
   },
   title: {
      fontSize: 24,
      color: Colors.pastelpink
   },
   addressContainer: {
      padding: 20
   },
   address: {
      color: Colors.pastelpink,
      textAlign: 'center'
   },
   mapPreview: {
      width: '100%',
      maxWidth: 350,
      height: 300,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
   }
});


export default MemDetailScreen;