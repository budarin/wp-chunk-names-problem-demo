// eslint-disable-next-line
const redux = require('@budarin/use-react-redux');

const { createContext, createStorage } = redux;

const createStore = (initState: IAppState) => {
    // FIXME:
    // @ts-ignore
    // eslint-disable-next-line
    const StateContext = createContext<IAppState>(initState);
    // FIXME:
    // @ts-ignore
    // eslint-disable-next-line
    const DispatchContext = createContext();

    // eslint-disable-next-line
    return createStorage(StateContext, DispatchContext);
};

export default createStore;
