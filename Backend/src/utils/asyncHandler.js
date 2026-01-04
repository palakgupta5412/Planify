// Why making a asyncHandler function?
// Express does not natively catch errors thrown inside async functions 
// (routes or middleware). Without a utility, you’d have to wrap every 
// async function with try/catch, and use next(err) on error, which is repetitive.

const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))       //resolving the promise returned by reqHandler
        .catch((err)=>next(err));           //throwing error to express default error handler or custom error handler
    }
}

export {asyncHandler};
