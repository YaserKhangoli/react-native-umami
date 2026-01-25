import { Platform } from 'react-native';
import type {
  UmamiInitial,
  UmamiTrackPayload,
  UmamiIdentifyPayload,
  UmamiVisitPayload,
} from './types';

export class UmamiService {
  private options: UmamiInitial = {} as UmamiInitial;
  private id: string | null | undefined;

  public init(initial: UmamiInitial) {
    this.options = initial;
  }

  public visit(payload: UmamiVisitPayload) {
    this.send('event', payload);
  }

  public track(payload: UmamiTrackPayload) {
    this.send('event', payload);
  }

  public identify(payload: UmamiIdentifyPayload) {
    this.id = payload.id || null;
    this.send('identify', payload);
  }

  private send(
    type: 'event' | 'identify',
    payload: UmamiTrackPayload | UmamiIdentifyPayload
  ) {
    this.ensureInitialized();
    const { hostUrl, userAgent, ...restOption } = this.options;

    const finalPayload: any = {
      ...restOption,
      ...payload,
    };

    if (this?.id) {
      finalPayload.id = this?.id;
    } else {
      delete finalPayload.id;
    }

    return fetch(`${hostUrl}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent || this.getUserAgent(),
      },
      body: JSON.stringify({
        type,
        payload: finalPayload,
      }),
    });
  }

  private getUserAgent(): string {
    if (Platform.OS == 'ios') {
      return 'App (iPhone; ReactNative)';
    }

    return 'App (Android; Mobile; ReactNative)';
  }

  private ensureInitialized() {
    if (!this.options) {
      throw new Error(
        '[Umami] You must call umami.init({ ... }) before using visit(), track(), or identify().'
      );
    }
  }
}
const umami = new UmamiService();

export { umami };
