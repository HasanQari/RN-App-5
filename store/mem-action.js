import * as FileSystem from 'expo-file-system';
import { insertMemories, fetchMemories } from '../helpers/db';
import ENV from '../env';

export const ADD_MEM = 'ADD_MEM';
export const SET_MEM = 'SET_MEM';

export const addMem = (title, image, location) => {

    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);
        if (!response.ok) {
            throw new Error('something wrong :) response')
        }
        const resData = await response.json();
        console.log(resData)
        if (!resData.results) {
            throw new Error('something wrong :) resData')
        }
        const address = resData.results[0].formatted_address;

        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertMemories(title, newPath, address, location.lat, location.lng);
            console.log(dbResult);
            dispatch({
                type: ADD_MEM,
                MemData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

    };
};

export const loadMem = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchMemories();
            console.log(dbResult)
            dispatch({ type: SET_MEM, mem: dbResult.rows._array });
        } catch (err) { throw err; }
    }
}

