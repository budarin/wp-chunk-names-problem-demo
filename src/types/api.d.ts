interface IApiRequest {
    id: string;
    ver: string;
    meta?: Record<string, any>;
    method: string;
    params: Record<string, any>;
}

interface IQueryRequest<T> {
    name: string;
    text: string;
    values: T[];
}

interface IDb {
    query: <E, T>(requestParams: IApiRequest) => Promise<TErrorOrResultObject<E, T>>;
    getActiveConnections: () => number;
    reset: () => void;
    end: () => void;
}
