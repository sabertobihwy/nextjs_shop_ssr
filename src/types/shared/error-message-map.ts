import { ErrorCode } from "./error-code";

// lib/error-message-map.ts
export const errorMessageMap: Record<ErrorCode, string> = {
    // 通用错误
    [ErrorCode.UNKNOWN]: '未知错误，请稍后重试',
    [ErrorCode.VALIDATION_ERROR]: '数据验证失败',
    [ErrorCode.MISSING_PARAMETERS]: '缺少必要参数',
    [ErrorCode.INVALID_PARAMETERS]: '参数格式错误',

    // 认证相关
    [ErrorCode.UNAUTHORIZED]: '请先登录',
    [ErrorCode.FORBIDDEN]: '您没有权限执行此操作',
    [ErrorCode.TOKEN_EXPIRED]: '登录信息已过期，请重新登录',

    // 用户相关
    [ErrorCode.USER_NOT_FOUND]: '用户不存在',
    [ErrorCode.USER_ALREADY_EXISTS]: '该用户已存在',
    [ErrorCode.INVALID_CREDENTIALS]: '用户名或密码错误',
    [ErrorCode.INVALID_TOKEN]: '令牌无效，请重新登录',
    [ErrorCode.USER_ROLE_INVALID]: '用户身份不合法',

    // 商品/订单相关
    [ErrorCode.PRODUCT_NOT_FOUND]: '商品未找到',
    [ErrorCode.PRODUCT_OUT_OF_STOCK]: '商品已售罄',
    [ErrorCode.CART_EMPTY]: '购物车为空',

    [ErrorCode.ORDER_NOT_FOUND]: '订单不存在',
    [ErrorCode.ORDER_ALREADY_PAID]: '订单已支付，无法重复支付',
    [ErrorCode.ORDER_CANCEL_FAILED]: '订单取消失败，请稍后重试',

    // 系统相关
    [ErrorCode.INTERNAL_SERVER_ERROR]: '服务器错误，请稍后重试',
    [ErrorCode.SERVICE_UNAVAILABLE]: '服务暂时不可用，请稍后访问',

    // tenant 
    [ErrorCode.TENANT_NOT_FOUND]: '找不到商户',
    [ErrorCode.INVALID_PASSWORD]: "密码不正确",
    [ErrorCode.INVALID_UUID]: "",
    [ErrorCode.INVALID_HASHED_PASSWORD]: "",
    [ErrorCode.INVALID_INPUT]: ""
}

