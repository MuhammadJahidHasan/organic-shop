const createHttpError = require("http-errors");



const notFound = (req, res, next) => {

      next(createHttpError(404,'Your request content was not found'));

};

const errorHandler = (err, req, res) => {

      res.status(res.status || 500).json({
          error: err 
      });

};

module.exports = {
     
    notFound,
    errorHandler
     
};

