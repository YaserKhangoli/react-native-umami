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

  /**
   * Initialize Umami with configuration. Must be called before visit(), track(), or identify().
   * @param initial - Host URL, hostname, website ID, and optional title/userAgent
   */
  public init(initial: UmamiInitial) {
    this.options = initial;
  }

  /**
   * Track a page visit (pageview). Records a view of a screen or page.
   * @param payload - URL, optional referrer, and custom data
   */
  public visit(payload: UmamiVisitPayload) {
    this.send('event', payload);
  }

  /**
   * Track a custom event (e.g. button clicks, signups, conversions).
   * Event names are limited to 50 characters. Events appear under Umami dashboard → Events.
   * @param payload - Event name, optional URL/referrer, and custom data
   */
  public track(payload: UmamiTrackPayload) {
    this.send('event', payload);
  }

  /**
   * Identify the user with a distinct ID. Associates activity with a single user across sessions.
   * Call when the user logs in to attribute their behavior.
   * @param payload - User ID (max 50 chars), optional URL/referrer, and custom data
   * @remarks Calling with a new ID changes the session ID—Umami treats it as a new user. Call only when the user actually changes.
   */
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
