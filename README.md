# react-native-umami-sdk

React Native Umami Analytics Library — [umami.is](https://umami.is)

## Installation

```sh
npm install react-native-umami-sdk
```

Or with Yarn:

```sh
yarn add react-native-umami-sdk
```

## Usage

### Initialize

Call `init` before using any other methods.

```ts
import umami from 'react-native-umami-sdk';

umami.init({
  hostUrl: 'https://api.umami.is',
  hostname: 'example.com',
  website: 'your-website-id',
  title: 'My App',
  userAgent: 'App (iPhone; ReactNative)', // optional
});
```

### Identify

Identify users by passing a unique ID. This associates page views, events, and conversions with a single user across sessions. Use it when a user logs in to attribute their behavior, connect activity across sessions or devices, and distinguish repeat users from new users.

> **Note:** Calling `identify()` with a new ID changes the session ID. Umami treats this as a new user—the previous session ends and a new one begins. Call it only when the user actually changes (e.g., on login).

```ts
umami.identify({
  id: 'user-123',
  url: '/screen/profile',
  data: { plan: 'premium' },
});
```

### Track Screen Visits with React Navigation

Add `onStateChange` to your `NavigationContainer` to automatically track screen visits:

```ts
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { createRef } from 'react';
import umami from 'react-native-umami-sdk';

export const navigationRef = createNavigationContainerRef<any>();
const previousRouteNameRef = createRef<string>();

export default function App() {
  umami.init({
    hostUrl: 'https://analytics.example.com',
    hostname: 'example.com',
    website: 'your-website-id',
    title: 'My App',
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        if (!state) return;
        const currentRoute = navigationRef.current?.getCurrentRoute()?.name;
        umami.visit({
          referrer: (previousRouteNameRef.current as string) || '/',
          url: '/' + currentRoute + '/',
        });
        previousRouteNameRef.current = '/' + currentRoute;
      }}
    >
      {/* Your screens */}
    </NavigationContainer>
  );
}
```

### Track Screen Visits with Expo Router

Expo Router exposes the current URL via `usePathname()`, so you can track screen visits in your root layout with `useEffect`:

```ts
// app/_layout.tsx
import { useEffect, useRef } from 'react';
import { usePathname, Slot } from 'expo-router';
import umami from 'react-native-umami-sdk';

export default function RootLayout() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>('/');

  umami.init({
    hostUrl: 'https://analytics.example.com',
    hostname: 'example.com',
    website: 'your-website-id',
    title: 'My App',
  });

  useEffect(() => {
    umami.visit({
      referrer: previousPathnameRef.current || '/',
      url: pathname || '/',
    });
    previousPathnameRef.current = pathname || '/';
  }, [pathname]);

  return <Slot />;
}
```

### Visit

Track page visits (pageviews). Each call records a view of a screen or page. You can optionally include a referrer and custom data.

```ts
umami.visit({
  url: '/screen/home',
  referrer: '/screen/login',
  data: { screen: 'home' },
});
```

### Track

Track custom events such as button clicks, signups, or conversions. Events appear on your Umami dashboard under **Events**, and any custom data is available in the **Properties** tab. Event names are limited to 50 characters. Event data cannot be sent without an event name.

```ts
umami.track({
  name: 'button_click',
  url: '/screen/settings',
  data: { button: 'save' },
});
```

## API

### Methods

| Method      | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `init()`    | Initialize Umami with configuration                                         |
| `visit()`   | Track page visits (pageviews)                                               |
| `track()`   | Track custom events (clicks, signups, conversions); view in Events & Properties |
| `identify()`| Set distinct ID to associate activity with a user; new ID starts a new session |

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
