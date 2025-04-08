export class TestResult {
    constructor(pass, messageText) {
      this.pass = pass;
      this._messageText = messageText;
    }
    message() {
      return this._messageText;
    }
  }