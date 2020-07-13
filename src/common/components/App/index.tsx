// eslint-disable-next-line
let hot;

if (!__PROD__) {
    // eslint-disable-next-line
    hot = require('react-hot-loader/root').hot;
}

import React from 'react';
import { Switch, Route } from 'react-router';
import router, { Routes } from '../../router';
import ErrorBoundary from '../ErrorBoundary';

import createStorage from '../../redux/appStore';
import appReducer from '../../redux/appReducer';
import appMiddlewares from '../../redux/appMiddlewares';

import css from './app.css';

interface IAppProps {
    state: IAppState;
}

const RoutesComponent = () => (
    <Switch>
        {(Object.keys(router) as Routes[]).map((key) => {
            const { path, exact, component } = router[key];

            return <Route key={key} path={path} exact={exact} component={component} />;
        })}
    </Switch>
);

const App = ({ state }: IAppProps): React.ReactElement => {
    // FIXME: тут ли располагать создание createStorage?
    //@ts-ignore
    const { StoreProvider } = createStorage(state);

    return (
        <>
            <div className={css.pageHeader}>
                <h1>Hello world !</h1>
            </div>

            <StoreProvider reducer={appReducer(state)} initialState={state} middlewares={appMiddlewares}>
                <ErrorBoundary>
                    <RoutesComponent />
                </ErrorBoundary>
            </StoreProvider>
        </>
    );
};

// eslint-disable-next-line
export default __PROD__ ? App : hot(App);
