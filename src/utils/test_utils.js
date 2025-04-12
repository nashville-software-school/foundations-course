// Factory function to create TestResult objects
export const TestResult = function({ passed=true, testName="N/A", message=null} = {}) {
  const initialMessages = []

  // Add initial message if valid
  if (message && typeof message === 'string') {
    initialMessages.push(message)
  }

  // Create a new object with no prototype and define all properties on it
  const testResult = Object.create(null, {
    // Public methods
    addMessage: {
      value: function(message) {
        if(this._valid(message)) this._messages.push(message)
      },
      enumerable: true,
      writable: false,
      configurable: false
    },
    messages: {
      value: function() {
        return this._messages
      },
      enumerable: true,
      writable: false,
      configurable: false
    },
    formattedMessage: {
      get: function() {
        return this._messages.map((msg, index) => `   ${index + 1}. ${msg}`).join('\n')
      },
      enumerable: true,
      configurable: false
    },

    // Public properties
    passed: {
      value: passed,
      enumerable: true,
      writable: false,
      configurable: false
    },
    testName: {
      value: testName,
      enumerable: true,
      writable: false,
      configurable: false
    },

    // Private methods and properties
    _valid: {
      value: function(msg) {
        if (msg && typeof msg === 'string') return true
        return false
      },
      enumerable: false,
      writable: false,
      configurable: false
    },
    _messages: {
      value: initialMessages,
      enumerable: false,
      writable: true,
      configurable: false
    }
  })

  // Freeze the object before returning it
  return Object.freeze(testResult)
}