// Define the prototype object with all methods
const TestResultProto = {
  add_message(message) {
    if(this._valid(message)) this._messages.push(message);
  },
  messages() {
    return this._messages;
  },
  formatted_message() {
    return this._messages.join('\n');
  },
  // private
  _valid(msg){
    if (msg && typeof msg === 'string') return true
    return false
  }
};

// Factory function to create TestResult objects
export const TestResult = function({ passed=true, testName="N/A", message=null} = {}) {
  // Create a new object with the prototype
  const testResult = Object.create(TestResultProto);

  // Initialize properties
  testResult.passed = passed;
  testResult.testName = testName;
  testResult._messages = [];

  // Add initial message if valid
  if(testResult._valid(message)) testResult._messages.push(message);

  return testResult;
};