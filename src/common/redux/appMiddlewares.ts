/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// FIXME:
// @ts-ignore
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('action', action);

    return next(action);
};

const appMiddlewares = [loggerMiddleware];

export default appMiddlewares;
