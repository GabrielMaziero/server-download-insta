export class Exception extends Error {
  code: number;
  /**
   * @param message
   * @param code
   */
  constructor(message = "Instagram Exception", code = 500) {
    super(message);
    this.code = code;
  }
}

export class BadRequest extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Bad Request", code = 400) {
    super(message, code);
  }
}

export class TimeoutException extends Exception {
  /**
   * @param message
   * @param code
   */
  constructor(message = "Request timeout, please try again.", code = 408) {
    super(message, code);
  }
}