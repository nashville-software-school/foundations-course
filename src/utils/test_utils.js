export class TestResult {
    constructor({ passed=true, testName="N/A", message=null} = {}){
      this.passed = passed;
      this.testName = testName;
      this._messages = []
      if(this._valid(message)) this._messages.push(message)
    }
    add_message(message) {
      if(this._valid(message)) this._messages.push(message);
    }
    messages() {
      return this._messages;
    }
    formatted_message() {
      return this._messages.join('\n');
    }
    // private
    _valid(msg){
      if (msg && typeof msg === 'string') return true
      // console.error(`${this.constructor.name} ${this.testName} message ${msg} invalid!`)
      return false
    }
  }