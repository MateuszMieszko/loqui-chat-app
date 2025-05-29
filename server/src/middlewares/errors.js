function notFound(req, res, next) {
    res.status(404).json({ message: "404 Page not found." })
}

function catchAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}

function catchErrors(err, req, res, next) {
    res.status(err.status || 500).json({ err });
}

module.exports = {
    notFound,
    catchAsync,
    catchErrors
};