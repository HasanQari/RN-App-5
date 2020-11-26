import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import MemListScreen from '../screens/MemListScreen';
import MemDetailScreen from '../screens/MemDetailScreen';
import NewMemScreen from '../screens/NewMemScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/Colors';
//-----------------------------------------------------------------------------

const defaultNavOptions = {
    headerStyle: {backgroundColor: Platform.OS === 'android' ? Colors.header : ''},
    headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.pastelpink,
    cardStyle: { backgroundColor: Colors.BG },
}

const MemNavigator = createStackNavigator(
    {
        MemList: {
            screen: MemListScreen,
            navigationOptions: { headerTitle: 'MEMORIES' }
        },
        MemDetail: {
            screen: MemDetailScreen,
            // navigationOptions: { headerTitle: 'MEMORY Review' }
        },
        NewMem: {
            screen: NewMemScreen,
            navigationOptions: { headerTitle: 'Create New MEMORY' }
        },
        Map: {
            screen: MapScreen,
            navigationOptions: { headerTitle: 'Maps' }
        },
    },
    { defaultNavigationOptions: defaultNavOptions })

export default createAppContainer(MemNavigator);