import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = props => {
   const initLocation = props.navigation.getParam('initLocation');
   const readonly = props.navigation.getParam('readonly');

   const [selectedLocation, setSelectedLocation] = useState(initLocation);

   const mapRegion = {
      latitude: initLocation ? initLocation.lat : 37.78,
      longitude: initLocation ? initLocation.lng : -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
   };

   const selectLocationHandler = event => {
      if (readonly) {
         return;
      }
      setSelectedLocation({
         lat: event.nativeEvent.coordinate.latitude,
         lng: event.nativeEvent.coordinate.longitude
      });
   };

   const saveHandler = useCallback(() => {
      if (!selectedLocation) {
         Alert.alert('Fetching Error', 'something went wrong please choose a location to add it!', [{ text: 'I see', style: 'destructive' }]);
         return;
      }
      props.navigation.navigate('NewMem', { pickedLocation: selectedLocation });
   }, [selectedLocation]);

   useEffect(() => {
      props.navigation.setParams({ saveLocation: saveHandler })
   }, [saveHandler])

   let markerCoordinates;

   if (selectedLocation) {
      markerCoordinates = {
         latitude: selectedLocation.lat,
         longitude: selectedLocation.lng
      };
   }

   return (
      <MapView
         style={styles.map}
         region={mapRegion}
         onPress={selectLocationHandler}
      >
         {markerCoordinates && (
            <Marker title="Picked Location" coordinate={markerCoordinates} />
         )}
      </MapView>
   );
};

MapScreen.navigationOptions = navData => {
   const save = navData.navigation.getParam('saveLocation');
   const readonly = navData.navigation.getParam('readonly');
   if (readonly) {
      return{};
   }
   return {
      headerRight: () => (
         <TouchableOpacity style={styles.headerBtn} onPress={save}>
            <Text style={styles.saveBtn}>Save</Text>
         </TouchableOpacity>
      )
   }
}

const styles = StyleSheet.create({
   map: {
      flex: 1
   },
   headerBtn: {
      marginHorizontal: 20
   },
   saveBtn: {
      fontSize: 16,
      color: Platform.OS === 'android' ? Colors.white : Colors.orange,
   }
});

export default MapScreen;

// import React, { useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const MapScreen = props => {

//    const [selectedLocation, setSelectedLocation] = useState();

//    const mapRegion = {
//       latitude: 12.3,
//       longtude: 31.65,
//       latitudeDelta: 0.0922,
//       longtudeDelta: 0.0421,
//    };

//    const selectLocationHandler = event => {
//       console.log(event);
//       setSelectedLocation({
//          lat: event.nativeEvent.coordinate.latitude,
//          lng: event.nativeEvent.coordinate.longitude
//       });
//    };

//    let markerCoord;

//    if (selectedLocation) {
//       markerCoord = {
//         latitude: selectedLocation.lat,
//         longitude: selectedLocation.lng
//       };
//     }

//    return (
//       <MapView style={styles.map} region={mapRegion} onPanDrag={selectLocationHandler} >
//          {markerCoord && <Marker title='Piked Location' coordinate={markerCoord}></Marker>}
//       </MapView>
//    )
// }

// const styles = StyleSheet.create({
//    map: {
//       flex: 1,
//    }
// });

// export default MapScreen;