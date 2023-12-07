import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import store from './src/store';

import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import { RootState } from './src/store/reducer';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  // 리덕스에서 관리 (앱 전반에 걸쳐서 사용하게 될거니까)
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  /* 
    email이 있냐 없냐로 로그인 판단. 추후 Token으로 변경
    그런데 useSelector는 Provider 안에서만 사용가능
    isLoggedIn를 Provider 안으로 보내주어야 함
    -> Provider 안의 내용을 따로 분리
  */

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen
              name='Orders'
              component={Orders}
              options={{ title: '오더 목록' }}
            />
            <Tab.Screen
              name='Delivery'
              component={Delivery}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name='Settings'
              component={Settings}
              options={{ title: '내 정보' }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name='SignIn'
              component={SignIn}
              options={{ title: '로그인' }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUp}
              options={{ title: '회원가입' }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
