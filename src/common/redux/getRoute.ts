import { Routes } from '../router';

export default function getRoute(state: IAppState): Routes {
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (state && state.router && state.router.route) {
        // FIXME:
        // eslint-disable-next-line
        return state.router.route as Routes;
    }

    return Routes.NOT_FOUND;
}
