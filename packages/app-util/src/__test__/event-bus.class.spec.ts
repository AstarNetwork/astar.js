import { EventBus } from '../shared/event-bus.class';

class TestEvent extends EventBus<{ log: number }> {
  readonly sendEvent: EventBus<{ log: number }>['emit'];

  constructor() {
    super();
    this.sendEvent = this.emit;
  }
}

describe('event emitting', () => {
  const testEvent = new TestEvent();
  test('event should be  emitted', async () => {
    let a = 0;
    const unsubscribe = testEvent.on('log', () => {
      a = a + 1;
    });
    expect(a).toEqual(0);
    testEvent.sendEvent('log', 5);
    await 0;
    expect(a).toEqual(1);
    if (unsubscribe) {
      unsubscribe();
    }
  });
  test('event value should be 5', () => {
    let a: number | null = null;
    testEvent.on('log', (value) => {
      a = value;
    });
    testEvent.sendEvent('log', 5);
    setTimeout(() => {
      expect(a).toEqual(5);
    }, 1);
  });
});

describe('Subscriptions', () => {
  test('should unsubscribe', () => {
    const testEvent = new TestEvent();
    let a = 0;
    const unsubscribe = testEvent.on('log', () => {
      a = a + 1;
    });
    expect(a).toEqual(0);
    testEvent.sendEvent('log', 5);
    if (unsubscribe) {
      unsubscribe();
    }
    setTimeout(() => {
      expect(a).toEqual(0);
    }, 1);
  });
  test('Once will trigger only one time', () => {
    const testEvent = new TestEvent();
    let a = 0;
    testEvent.once('log', (log) => {
      a = log;
    });
    testEvent.sendEvent('log', 1);
    testEvent.sendEvent('log', 2);
    expect(a).toEqual(1);
  });

  test('Unsubscribe all', () => {
    const testEvent = new TestEvent();
    let a = 0;
    testEvent.on('log', (log) => {
      a = log;
    });
    testEvent.unsubscribeAll();
    testEvent.sendEvent('log', 1);
    testEvent.sendEvent('log', 2);
    expect(a).toEqual(0);
  });
});
