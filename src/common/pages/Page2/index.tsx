import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import css from './page2.css';
import { IPage } from '../../../types/pages';
import setHeaderColors from '../../utils/setHeaderColors';

const Page2: IPage = () => {
    useEffect(() => {
        document.title = 'Page2';
        setHeaderColors({ color: 'white', bgColor: 'red' });
    }, []);

    return (
        <>
            <h2 className={css.h2}>Pag2</h2>
            <Link to="/page1">Page1</Link>
            <br />
            <Link to="/page3">Page3</Link>
        </>
    );
};

Page2.loadData = () => {
    return {};
};

export default Page2;
