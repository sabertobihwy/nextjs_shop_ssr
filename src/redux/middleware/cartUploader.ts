import { Middleware } from '@reduxjs/toolkit';
import { debounceUploadCart } from '@/lib/service/client/cart';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const createCartUploaderMiddleware = <State = unknown>(): Middleware<{}, State> => store => next => action => {
    const result = next(action);

    if (typeof action === 'object' && action !== null && 'type' in action) {
        const type = (action as { type: string }).type;

        if (type.startsWith('cart/')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const state = store.getState() as any;
            const { user } = state.auth || {};
            const { tenantId, tenantName } = state.tenant || {};
            const { items } = state.cart || {};

            if (user?.id && tenantId && tenantName) {
                debounceUploadCart(user.id, tenantId, tenantName, items);
            }
        }
    }

    return result;
};
