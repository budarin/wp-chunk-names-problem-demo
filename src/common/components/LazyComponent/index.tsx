import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { RouterParams } from '../../../types/routes';

interface LazyModule {
    default: React.ComponentType<RouteComponentProps<RouterParams>>;
}

export type LazyComponentType = React.ComponentType<RouteComponentProps<RouterParams>> & {
    loader(): Promise<LazyModule>;
};

export interface LazyProps {
    id: string;
    asyncLoader(): Promise<LazyModule>;
    syncLoader(): LazyModule | undefined;
    fallback?: JSX.Element;
}

const Loading = <h1>Loading</h1>;

// eslint-disable-next-line max-lines-per-function
export function lazyComponent({ asyncLoader, syncLoader, id }: LazyProps): LazyComponentType {
    const LazyComponent = (props: RouteComponentProps<RouterParams>) => {
        const componentModule = syncLoader();
        let Component: React.ComponentType<RouteComponentProps<RouterParams>> | undefined;

        // Server
        if (componentModule) {
            Component = componentModule.default;
        } else {
            // Have preloaded module and make component sync
            // eslint-disable-next-line
            if (require.cache[id]) {
                // eslint-disable-next-line
                // @ts-ignore
                // eslint-disable-next-line
                Component = require.cache[id].exports.default;
            } else {
                Component = React.lazy(asyncLoader);

                return (
                    <React.Suspense fallback={Loading}>
                        <Component {...props} />
                    </React.Suspense>
                );
            }
        }

        if (!Component) {
            // eslint-disable-next-line
            throw new Error('Cannot load component');
        }

        return <Component {...props} />;
    };

    LazyComponent.loader = asyncLoader;

    return LazyComponent;
}
