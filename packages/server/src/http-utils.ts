export enum Statuscodes {
  OK = 200,
  BadRequest = 400,
  InternalServerError = 500
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}

export enum CodeDescriptions {
  OK = 'OK - The request was successful',
  BadRequest = 'Bad request - The server could not understand the request due to invalid syntax.',
  InternalServerError =
    'Internal Server Error - An unexpected error condition occurred that prevented the server from fulfilling the request.'
}
