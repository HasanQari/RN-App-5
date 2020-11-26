import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const LoactionPicker = props => {
    const [pikedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const { onLocationPicked } = props;
    const mapPickedLocation = props.navigation.getParam('pickedLocation');
    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const PermissionReq = await Permissions.askAsync(
            Permissions.LOCATION,
        );
        if (PermissionReq.status !== 'granted') {
            Alert.alert('Location Permissions Deny', 'You need allow permissions to using the App!', [{ text: 'OK' }]);
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) { return; }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            console.log(location);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'Try again or pick a location from the map.',
                [{ text: 'OK' }]
            )
        }
        setIsFetching(false);
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.LoactionPicker} >
            <MapPreview style={styles.mapPreview} location={pikedLocation} onClick={pickOnMapHandler} >
                {isFetching ?
                    <ActivityIndicator size='large' color={Colors.header} /> :
                    <Text>No Location Chosen yet!</Text>
                }
            </MapPreview>
            <View style={styles.btnContainer}>
                <Button
                    title='Auto Find Location'
                    color={Colors.pastelpink}
                    onPress={getLocationHandler}
                />
                <Button
                    title='Select on Map'
                    color={Colors.pastelpink}
                    onPress={pickOnMapHandler}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    LoactionPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: Colors.pastelpink,
        borderWidth: 2,

    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    }

});

export default LoactionPicker;