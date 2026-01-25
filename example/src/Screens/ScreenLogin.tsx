import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import umami from 'react-native-umami';
import type { RootNavigatorParamList } from '../RootTypes';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'ScreenLogin'
>;

const ScreenLogin = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const onPressHandler = () => {
    umami.identify({
      id: 'userId',
      data: { name: 'Yaser', family: 'Khangoli' },
    });
    umami.track({
      name: 'ProfileClickEvent',
    });
    navigation.navigate('ScreenProfile');
  };

  return (
    <View>
      <Text>ScreenLogin</Text>
      <Button title="Go To Profile" onPress={onPressHandler} />
    </View>
  );
};

export default ScreenLogin;
