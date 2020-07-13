import React from 'react';
import ReactDOM from 'react-dom';

import router from '../common/router';
import getRoute from '../common/redux/getRoute';
import ClientApp from '../common/containers/ClientApp';
import { LazyComponentType } from '../common/components/LazyComponent';

declare global {
    interface Window {
        __PRELOADED_APP_STATE__: IAppState;
    }
}

const state = window.__PRELOADED_APP_STATE__;
// eslint-disable-next-line fp/no-delete
delete window.__PRELOADED_APP_STATE__;

history.scrollRestoration = 'manual';

const renderApp = async () => {
    const route = getRoute(state);

    if (route && router[route]) {
        await (router[route].component as LazyComponentType).loader();
    }

    ReactDOM.hydrate(<ClientApp state={state} />, document.getElementById('root'));
};

// FIXME:
// eslint-disable-next-line
document.addEventListener('DOMContentLoaded', renderApp);

if (!__PROD__) {
    if (module.hot) {
        // FIXME:
        // eslint-disable-next-line
        module.hot.accept('../common/components/App', renderApp);
    }
}
