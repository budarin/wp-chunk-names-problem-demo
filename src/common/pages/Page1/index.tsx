import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import css from './page1.css';
import { IPage } from '../../../types/pages';
import setHeaderColors from '../../utils/setHeaderColors';

const Page1: IPage = () => {
    useEffect(() => {
        document.title = 'Page1';
        setHeaderColors({ color: 'white', bgColor: 'green' });
    }, []);

    return (
        <>
            <h2 className={css.h2}>Pag1</h2>
            <Link to="/page2">Page2</Link>
            <br />
            <Link to="/page3">Page3</Link>
        </>
    );
};

Page1.loadData = () => {
    return {};
};

export default Page1;
