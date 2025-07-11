// constants/cookies.ts

import { SignOptions } from "jsonwebtoken";

export const COOKIE_PREFIX = {
    ACCESS_TOKEN: 'acc_tok_',
    REFRESH_TOKEN: 'ref_tok_',
    USER_PUBLIC: 'userpub_',
}

type StringValue = SignOptions['expiresIn']

export const TOKEN_EXPIRY: {
    ACCESS_TOKEN: { JWT: StringValue; COOKIE: number }
    REFRESH_TOKEN: { JWT: StringValue; COOKIE: number }
    USER_PUBLIC: { COOKIE: number }
} = {
    ACCESS_TOKEN: {
        JWT: '1h',         // 给 jwt.sign() 用的字符串
        COOKIE: 60 * 60,   // 给 cookie 设置用的秒数
    },
    REFRESH_TOKEN: {
        JWT: '7d',
        COOKIE: 60 * 60 * 24 * 7,
    },
    USER_PUBLIC: {
        COOKIE: 60 * 60 * 24 * 7,
    }
}
