import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from '../../components/App';

interface IClientAppProps {
    state: IAppState;
}

const ClientApp = ({ state }: IClientAppProps): React.ReactElement => (
    <BrowserRouter>
        <App state={state} />
    </BrowserRouter>
);

export default ClientApp;
