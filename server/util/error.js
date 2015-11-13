export default class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.detail = detail;
    Error.captureStackTrace(this, this.constructor.name);
  }
}
