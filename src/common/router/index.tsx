import { RouteProps } from 'react-router';
import { lazyComponent } from '../components/LazyComponent';

export enum Routes {
    HOME = '1.home',
    PAGE1 = '2.page1',
    PAGE2 = '3.page2',
    PAGE3 = '4.page2',
    NOT_FOUND = 'notFound',
}

export interface AppRouteProps extends RouteProps {
    title: string;
}

const Page1 = lazyComponent({
    // @ts-ignore
    async asyncLoader() {
        if (__CLIENT__) {
            return import(/* webpackChunkName: "Page1" */ '../pages/Page1/Page1');
        }
    },
    syncLoader() {
        if (__SERVER__) {
            return require('../pages/Page1/Page1');
        }
    },
    // @ts-ignore
    id: require.resolveWeak('../pages/Page1/Page1'),
});

const Page2 = lazyComponent({
    // @ts-ignore
    async asyncLoader() {
        if (__CLIENT__) {
            return import(/* webpackChunkName: "Page2" */ '../pages/Page2/Page2');
        }
    },
    syncLoader() {
        if (__SERVER__) {
            return require('../pages/Page2/Page2');
        }
    },
    // @ts-ignore
    id: require.resolveWeak('../pages/Page2/Page2'),
});

const Page3 = lazyComponent({
    // @ts-ignore
    async asyncLoader() {
        if (__CLIENT__) {
            return import(/* webpackChunkName: "Page1" */ '../pages/Page3/Page3');
        }
    },
    syncLoader() {
        if (__SERVER__) {
            return require('../pages/Page3/Page3');
        }
    },
    // @ts-ignore
    id: require.resolveWeak('../pages/Page3/Page3'),
});

const NotFound = lazyComponent({
    // @ts-ignore
    async asyncLoader() {
        if (__CLIENT__) {
            return import(/* webpackChunkName: "Page1" */ '../components/NotFound');
        }
    },
    syncLoader() {
        if (__SERVER__) {
            return require('../components/NotFound');
        }
    },
    // @ts-ignore
    id: require.resolveWeak('../components/NotFound'),
});

const router: Record<Routes, AppRouteProps> = {
    [Routes.HOME]: {
        title: 'Page1',
        path: '/',
        exact: true,
        component: Page1,
    },
    [Routes.PAGE1]: {
        title: 'Page1',
        path: '/page1',
        exact: true,
        component: Page1,
    },
    [Routes.PAGE2]: {
        title: 'Page2',
        path: '/page2',
        exact: true,
        // eslint-disable-next-line
        component: Page2,
    },
    [Routes.PAGE3]: {
        title: 'Page3',
        path: '/page3',
        exact: true,
        // eslint-disable-next-line
        component: Page3,
    },
    [Routes.NOT_FOUND]: {
        title: 'Not Found',
        // eslint-disable-next-line
        component: NotFound,
    },
};

export default router;
