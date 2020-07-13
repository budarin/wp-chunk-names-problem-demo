declare const __PROD__: boolean;
declare const __SERVER__: boolean;
declare const __CLIENT__: boolean;

interface TErrorResult<E> {
    code: number;
    message: string;
    data?: E;
}

type TErrorOrResultObject<E, T> =
    | {
          result: T;
          error?: never;
      }
    | {
          result?: never;
          error: TErrorResult<E>;
      };
