export type ITokenResponse =
    | {
          iat: number;
          exp: number;
          token: string;
      }
    | {
          code: string;
          message: string;
      };
