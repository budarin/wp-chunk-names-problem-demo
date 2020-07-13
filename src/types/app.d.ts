import Application from 'koa';
import { Server } from 'http';

import { IKoaState, IKoaContext } from './koa';

declare interface TGracefullShutdown {
    app: Application<IKoaState, IKoaContext>;
    server: Server;
}
