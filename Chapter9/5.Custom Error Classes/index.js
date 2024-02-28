class CustomError extends Error { 

  constructor(message, statusCode) { 

    super(message); 

    this.statusCode = statusCode; 

  } 

} 

// Usage 

throw new CustomError('Custom error message', 400); 