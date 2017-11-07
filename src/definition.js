/* @flow */

import type RelayRequest from './RelayRequest';
import type RelayRequestBatch from './RelayRequestBatch';
import type RelayResponse from './RelayResponse';

export type MiddlewareNextFn = (req: RelayRequest | RelayRequestBatch) => Promise<RelayResponse>;
export type Middleware = (next: MiddlewareNextFn) => MiddlewareNextFn;
// {
//   supports?: string | string[],
// };

export type FetchOpts = {
  url?: string,
  method: 'POST' | 'GET',
  headers: { [name: string]: string },
  body: string | FormData,
  [name: string]: mixed,
};

export type GraphQLResponseErrors = Array<{
  message: string,
  locations?: Array<{
    column: number,
    line: number,
  }>,
  stack?: Array<string>,
}>;

export type GraphQLResponse = {
  data?: any,
  errors?: GraphQLResponseErrors,
};

export type RRNLResponseObject = {
  ok: any,
  status: number,
  statusText: string,
  headers: { [name: string]: string },
  url: string,
  payload: ?GraphQLResponse,
};

export type RNLExecuteFunction = (
  operation: ConcreteBatch,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables?: ?UploadableMap
) => RelayObservable<QueryPayload>;

// ///////////////////////////
// Relay Modern re-exports
// ///////////////////////////

export type Variables = { [name: string]: $FlowFixMe };
export type ConcreteBatch = {
  kind: 'Batch',
  fragment: any,
  id: ?string,
  metadata: { [key: string]: mixed },
  name: string,
  query: any,
  text: ?string,
};
export type CacheConfig = {
  force?: ?boolean,
  poll?: ?number,
  rerunParamExperimental?: ?any,
};
export type Disposable = { dispose(): void };
export type Uploadable = File | Blob;
export type UploadableMap = { [key: string]: Uploadable };
export type PayloadData = { [key: string]: mixed };
export type QueryPayload =
  | {|
      data?: ?PayloadData,
      errors?: Array<any>,
      rerunVariables?: Variables,
    |}
  | RelayResponse;
// this is workaround should be class from relay-runtime/network/RelayObservable.js
export type RelayObservable<T> = Promise<T>;
// Note: This should accept Subscribable<T> instead of RelayObservable<T>,
// however Flow cannot yet distinguish it from T.
export type ObservableFromValue<T> = RelayObservable<T> | Promise<T> | T;
export type FetchFunction = (
  operation: ConcreteBatch,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: ?UploadableMap
) => ObservableFromValue<QueryPayload>;
// See SubscribeFunction type declaration in relay-runtime/network/RelayNetworkTypes.js
export type SubscribeFunction = (
  operation: ConcreteBatch,
  variables: Variables,
  cacheConfig: CacheConfig,
  observer: any
) => RelayObservable<QueryPayload> | Disposable;
