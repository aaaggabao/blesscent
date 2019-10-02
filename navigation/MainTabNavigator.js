import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AccountScreen from '../screens/AccountScreen';
import NewMemberScreen from '../screens/NewMemberScreen';
import StockistScreen from '../screens/StockistScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `monitor-dashboard${focused ? '' : '-outline'}`
          : 'monitor-dashboard'
      }
    />
  ),
  tabBarOptions: {
    activeTintColor: '#000',
    activeBackgroundColor: '#ffe536'
  },
};

AccountStack.path = '';

const NewMemberStack = createStackNavigator(
  {
    NewMember: NewMemberScreen,
  },
  config
);

NewMemberStack.navigationOptions = {
  tabBarLabel: 'New Member',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'account-plus-outline' : 'account-plus-outline'} />
  ),
  tabBarOptions: {
    activeTintColor: '#000',
    activeBackgroundColor: '#ffe536'
  },
};

NewMemberStack.path = '';

const StockistStack = createStackNavigator(
  {
    Stockist: StockistScreen,
  },
  config
);

StockistStack.navigationOptions = {
  tabBarLabel: 'Stockist',
  tabBarOptions: {
    activeTintColor: '#000',
    activeBackgroundColor: '#ffe536'
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'account-search-outline' : 'account-search-outline'} />
  ),

};

StockistStack.path = '';

const tabNavigator = createBottomTabNavigator({
  AccountStack,
  NewMemberStack,
  StockistStack,
});

tabNavigator.path = '';

export default tabNavigator;
