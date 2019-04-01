export class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError"
    }
}

export class PropertyRequiredError extends ValidationError {
    constructor(property) {
      super(`No property: ${property}`)
      this.name = "PropertyRequiredError"
      this.property = property
    }
}

export class CustomFetchError extends Error {
    constructor(message, code) {
      super(`FetchError: ${code} ${message}`);
      this.name = "FetchError"
      this.code = code
    }
}

export const handledResponse = response => {
    switch (response.status) {
        case 400: throw new CustomFetchError ('Bad request'   , response.status)
        case 404: throw new CustomFetchError ('Url not found' , response.status)        
        case 401: throw new CustomFetchError (response.message, response.status)                        
    }
    return response.json()
}