import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IPage } from '../../../types/pages';
import resetHeaderColors from '../../utils/resetHeaderColors';

const Page3: IPage = () => {
    useEffect(() => {
        document.title = 'Page3';
        resetHeaderColors();
    }, []);

    return (
        <>
            <h2>Pag3</h2>
            <Link to="/page1">Page1</Link>
            <br />
            <Link to="/page2">Page2</Link>
            <br />
            <Link to="/page4">Page4</Link>
        </>
    );
};

Page3.loadData = () => {
    return {};
};

export default Page3;
