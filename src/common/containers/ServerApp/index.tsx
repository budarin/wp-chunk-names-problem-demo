import React from 'react';
import { StaticRouter } from 'react-router';
import App from '../../components/App';

interface IServerAppProps {
    url: string;
    state: IAppState;
}

const ServerApp = ({ url, state }: IServerAppProps): React.ReactElement => {
    return (
        <StaticRouter location={url}>
            <App state={state} />
        </StaticRouter>
    );
};
export default ServerApp;
