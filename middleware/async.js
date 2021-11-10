module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler;
        } catch (e) {
            next(e);
        }
    }
}