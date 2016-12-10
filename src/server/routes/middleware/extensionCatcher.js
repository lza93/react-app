//CHANGE THIS
const path = require('path');

module.exports = function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        res.status(404).send("<h1>404 Page not found</h1>"); // can send custom error message here
    } else {
        next(null);
    }
};
