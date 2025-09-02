// public/externals/react-redux.proxy.mjs
const getRR = () => {
    const rr = self.__REACT_REDUX__;
    if (!rr) throw new Error('[react-redux-proxy] Host react-redux not ready.');
    return rr;
};
export const useDispatch = (...a) => getRR().useDispatch(...a);
export const useSelector = (...a) => getRR().useSelector(...a);
export const Provider = (...a) => getRR().Provider?.(...a);
const handler = {
    get(_t, p, r) {
        return Reflect.get(getRR(), p, r);
    }
};
const reduxProxy = new Proxy({}, handler)
export default reduxProxy;