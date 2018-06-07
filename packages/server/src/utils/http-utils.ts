export enum Statuscodes {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  ServiceUnavailable = 503
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
  NoContent = 'No Content - The request was successful and there is no response body.',
  Created = 'Created - The new resource has been created successfully.',
  BadRequest = 'Bad request - The server could not understand the request due to invalid syntax.',
  Unauthorized = 'Unauthorized - The user must be authenticated to access this resource.',
  NotFound = 'Not found - The resource could not be found.',
  Forbidden = 'Forbidden - The user is not authorized to access the resource.',
  InternalServerError =
    'Internal Server Error - An unexpected error condition occurred that prevented the server from fulfilling the request.'
}
