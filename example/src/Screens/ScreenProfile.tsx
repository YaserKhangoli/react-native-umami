import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import umami from 'react-native-umami';
import type { RootNavigatorParamList } from '../RootTypes';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'ScreenProfile'
>;

const ScreenProfile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const onPressHandler = () => {
    umami.track({
      name: 'SettingClickEvent',
    });
    navigation.navigate('ScreenSetting');
  };
  return (
    <View>
      <Text>ScreenProfile</Text>
      <Button title="Go To Setting" onPress={onPressHandler} />
    </View>
  );
};

export default ScreenProfile;
