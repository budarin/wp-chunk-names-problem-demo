import React, { useEffect } from 'react';

import NotFound from '../../components/NotFound';
import resetHeaderColors from '../../utils/resetHeaderColors';

const NotFoundPage = (): JSX.Element => {
    useEffect(() => {
        document.title = 'Nothing is found !';
        resetHeaderColors();
    }, []);

    return <NotFound />;
};

export default NotFoundPage;
