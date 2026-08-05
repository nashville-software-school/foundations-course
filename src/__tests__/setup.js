import '@testing-library/jest-dom'

// Monaco Editor uses ResizeObserver; stub it for jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
