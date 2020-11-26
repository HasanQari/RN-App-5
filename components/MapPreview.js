import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import ENV from '../env';

const MapPreview = props => {

    let mapImgPreviewUrl;
    if (props.location) {
        mapImgPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat
            },${props.location.lng
            }&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${props.location.lat
            },{props.location.lng}&key=${ENV.googleApiKey
            }`;
    }
    return (
        <TouchableOpacity onPress={props.onClick} style={{ ...styles.mapPreview, ...props.style }}>
            {props.location ? (
                <Image style={styles.mapImg} source={{ uri: mapImgPreviewUrl }} />
            ) : (
                    props.children
                )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImg: {
        width: '100%',
        height: '100%',
    }
});

export default MapPreview;