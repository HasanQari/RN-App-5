import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const HeaderButton = props => {
    return <Ionicons {...props} name="md-add-circle" size={30} color={Colors.white} style={{margin:20}} />
}

export default HeaderButton;