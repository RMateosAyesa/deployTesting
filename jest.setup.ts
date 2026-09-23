import '@testing-library/jest-dom'

function Dayjs() {
  return {
    isSame: jest.fn().mockReturnValue(false),
    isBefore: jest.fn().mockReturnValue(false),
    isAfter: jest.fn().mockReturnValue(false),
    isBetween: jest.fn().mockReturnValue(false),
    add: jest.fn().mockReturnThis(),
    subtract: jest.fn().mockReturnThis(),
    startOf: jest.fn().mockReturnThis(),
    endOf: jest.fn().mockReturnThis(),
    format: jest.fn().mockReturnValue('2024-01-01'),
    tz: jest.fn().mockReturnThis(),
    valueOf: jest.fn().mockReturnValue(0),
    hour: jest.fn().mockReturnValue(12),
    date: jest.fn().mockReturnValue(1),
    day: jest.fn().mockReturnValue(1),
    month: jest.fn().mockReturnValue(0),
    year: jest.fn().mockReturnValue(2024),
    minute: jest.fn().mockReturnValue(0),
    second: jest.fn().mockReturnValue(0),
    millisecond: jest.fn().mockReturnValue(0),
    set: jest.fn().mockReturnThis(),
    diff: jest.fn().mockReturnValue(0),
    clone: jest.fn().mockReturnThis(),
    toDate: jest.fn().mockReturnValue(new Date()),
    toISOString: jest.fn().mockReturnValue('2024-01-01T00:00:00.000Z'),
    toString: jest.fn().mockReturnValue('2024-01-01'),
  }
}
Dayjs.prototype.isSame = jest.fn()
Dayjs.prototype.isBefore = jest.fn()
Dayjs.prototype.isAfter = jest.fn()
Dayjs.prototype.isBetween = jest.fn()
Dayjs.prototype.add = function() { return this }
Dayjs.prototype.subtract = function() { return this }
Dayjs.prototype.startOf = function() { return this }
Dayjs.prototype.endOf = function() { return this }
Dayjs.prototype.format = jest.fn().mockReturnValue('2024-01-01')
Dayjs.prototype.tz = jest.fn().mockReturnValue('2024-01-01')
Dayjs.prototype.valueOf = jest.fn().mockReturnValue(0)
Dayjs.prototype.hour = jest.fn()
Dayjs.prototype.date = jest.fn()
Dayjs.prototype.day = jest.fn()
Dayjs.prototype.month = jest.fn()
Dayjs.prototype.year = jest.fn()
Dayjs.prototype.minute = jest.fn()
Dayjs.prototype.second = jest.fn()
Dayjs.prototype.millisecond = jest.fn()
Dayjs.prototype.set = jest.fn()
Dayjs.prototype.diff = jest.fn()
Dayjs.prototype.clone = jest.fn()
Dayjs.prototype.toDate = jest.fn()
Dayjs.prototype.toISOString = jest.fn()
Dayjs.prototype.toString = jest.fn()

const dayjsInstance = Object.assign(Dayjs, {
  extend: jest.fn(),
  updateLocale: jest.fn(),
  isDayjs: jest.fn().mockReturnValue(true),
  isSame: jest.fn(),
  isBefore: jest.fn(),
  isAfter: jest.fn(),
  isBetween: jest.fn(),
  now: jest.fn().mockReturnValue(0),
  locale: jest.fn().mockReturnValue(Dayjs),
  utc: jest.fn().mockReturnValue(Dayjs),
  tz: jest.fn().mockReturnValue(Dayjs),
})

jest.mock('dayjs', () => ({ __esModule: true, default: dayjsInstance }), { virtual: true })
jest.mock('dayjs/plugin/updateLocale', () => ({ default: jest.fn() }), { virtual: true })
jest.mock('dayjs/plugin/localeData', () => ({ default: jest.fn() }), { virtual: true })
jest.mock('dayjs/plugin/utc', () => ({ default: jest.fn() }), { virtual: true })
jest.mock('dayjs/plugin/timezone', () => ({ default: jest.fn() }), { virtual: true })
jest.mock('dayjs/plugin/customParseFormat', () => ({ default: jest.fn() }), { virtual: true })
jest.mock('dayjs/plugin/isSameOrAfter', () => ({ default: jest.fn() }), { virtual: true })
jest.mock('dayjs/plugin/isSameOrBefore', () => ({ default: jest.fn() }), { virtual: true })

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
})

global.IS_REACT_ACT_ENVIRONMENT = true

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.MessageChannel = class MessageChannel {
  port1 = {
    postMessage: () => {},
    onmessage: null,
    start: () => {},
    close: () => {},
  }
  port2 = {
    postMessage: () => {},
    onmessage: null,
    start: () => {},
    close: () => {},
  }
} as unknown as typeof MessageChannel
