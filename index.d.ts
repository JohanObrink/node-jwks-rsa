declare module 'jwks-manager' {

  import * as ExpressJwt from "express-jwt";

  function JwksRsa(options: JwksRsa.Options): JwksRsa.JwksClient;

  namespace JwksRsa {
    class JwksClient {
      constructor(options: Options);

      getKeys: () => Promise<Jwk[]>;
      getKeys: (cb: (err: Error, keys: Jwk[]) => any) => any;

      getSigningKeys: () => Promise<Jwk[]>;
      getSigningKeys: (cb: (err: Error, keys: Jwk[]) => any) => any;

      getSigningKey: (kid: string) => Promise<Jwk>;
      getSigningKey: (kid: string, cb: (err: Error, key: Jwk) => any) => any;
    }

    interface Jwk {
      kid: string;
      nbf?: number;
      publicKey?: string;
      rsaPublicKey?: string;
    }

    interface Options {
      jwksUri: string;
      rateLimit?: boolean;
      cache?: boolean;
      cacheMaxEntries?: number;
      cacheMaxAge?: number;
      jwksRequestsPerMinute?: number;
      strictSsl?: boolean;
      handleSigningKeyError?(err: Error, cb: (err: Error) => void): any;
    }

    function getKey(uri: string): Promise<Jwk>;
    function getKey(uri: string, cb: (err: Error, key: Jwk) => any): any;

    function expressJwtSecret(options: JwksRsa.Options): ExpressJwt.SecretCallback;

    function hapiJwt2Key(options: JwksRsa.Options): (name: string, scheme: string, options?: any) => void;

    function hapiJwt2KeyAsync(options: JwksRsa.Options): (name: string, scheme: string, options?: any) => void;

    function koaJwtSecret(options: JwksRsa.Options): (name: string, scheme: string, options?: any) => void;

    class ArgumentError extends Error {
      constructor(message: string);
    }

    class JwksError extends Error {
      constructor(message: string);
    }

    class JwksRateLimitError extends Error {
      constructor(message: string);
    }

    class SigningKeyNotFoundError extends Error {
      constructor(message: string);
    }
  }

  export = JwksRsa;
}
