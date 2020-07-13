import type { BaseLogger } from 'pino';
import Application, { ParameterizedContext, Context, Middleware, DefaultState } from 'koa';

interface IncomingError {
    message: string;
    code?: number;
    stack?: string;
    name?: string;
    [key: string]: any;
}

// https://github.com/koajs/koa/issues/1333
// https://github.com/ricardocasares/koats/blob/master/src/test/utils.ts\
interface IKoaContext extends Context {
    state: {
        'response-time': number;
        redisTime: number;
        appState: IAppState;
    };
    log: BaseLogger;
    isShuttingDown: boolean;
}

interface IKoaState extends DefaultState {
    body: IApiRequest;
}

type TKoaContext = ParameterizedContext<IKoaState, IKoaContext>;
type TKoaMiddleware = Middleware<IKoaState, IKoaContext>;
