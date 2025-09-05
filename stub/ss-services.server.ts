// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function register(_: any) {
    // 避免在 Server 被调用；真调用就抛错，便于早发现
    throw new Error('@ss/services is client-only; register() called on server');
}
export function provided() { return { link: false, image: false }; }
export function getVersion() { return 'services@1'; }
