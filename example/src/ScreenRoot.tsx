import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootNavigatorParamList } from './RootTypes';
import ScreenLogin from './Screens/ScreenLogin';
import ScreenProfile from './Screens/ScreenProfile';
import ScreenSetting from './Screens/ScreenSetting';

export const MainStackNavigation =
  createNativeStackNavigator<RootNavigatorParamList>();

const ScreenRoot = () => {
  return (
    <MainStackNavigation.Navigator>
      <MainStackNavigation.Screen
        name={'ScreenLogin'}
        component={ScreenLogin}
      />
      <MainStackNavigation.Screen
        name={'ScreenProfile'}
        component={ScreenProfile}
      />
      <MainStackNavigation.Screen
        name={'ScreenSetting'}
        component={ScreenSetting}
      />
    </MainStackNavigation.Navigator>
  );
};

export default ScreenRoot;
