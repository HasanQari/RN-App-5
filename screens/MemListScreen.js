import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as memActions from '../store/mem-action';
import HeaderButton from '../components/HeaderButton';
import MemItem from '../components/MemItem';

const MemListScreen = props => {
    const mem = useSelector(s => s.memories.memories)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(memActions.loadMem());
    }, [dispatch])

    return (
        <FlatList
            data={mem}
            keyExtractor={i => i.id}
            renderItem={itemData => (
                <MemItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() => {
                        props.navigation.navigate('MemDetail', {
                            memId: itemData.item.id,
                            memTitle: itemData.item.title
                        });
                    }}
                />
            )}
        />
    )
}

MemListScreen.navigationOptions = navData => {
    return {
        headerRight: () => (<HeaderButton onPress={() => { navData.navigation.navigate('NewMem') }} />)
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MemListScreen;