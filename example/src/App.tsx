import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { createRef } from 'react';
import umami from 'react-native-umami-sdk';
import ScreenRoot from './ScreenRoot';

export const navigationRef = createNavigationContainerRef<any>();
export const screenIsReadyRef = createRef();
const previousRouteNameRef = createRef();

export default function App() {
  umami.init({
    hostUrl: 'hostURL',
    hostname: 'websiteDomain',
    website: 'websiteId',
    title: 'App Name',
  });

  return (
    <NavigationContainer
      onStateChange={(state) => {
        if (!state) {
          return;
        }
        umami.visit({
          referrer: (previousRouteNameRef.current as string) || '/',
          url: '/' + navigationRef.current?.getCurrentRoute()?.name + '/',
        });
        previousRouteNameRef.current =
          '/' + navigationRef.current?.getCurrentRoute()?.name;
      }}
      ref={navigationRef}
    >
      <ScreenRoot />
    </NavigationContainer>
  );
}
