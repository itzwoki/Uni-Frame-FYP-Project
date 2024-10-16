// Create a middleware function to handle errors globally
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err); // Log the error
  
    // Set a default status code
    let statusCode = 500;
  
    // Check if the error has a status code property
    if (err.statusCode) {
      statusCode = err.statusCode;
    }
  
    // Send an error response
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error'
    });
  };
  
  module.exports = errorHandler;

  
  