import { ActionRespTypeError, ActionRespTypeSuccess } from '@/types/api/response';
import { redirect } from 'next/navigation';

export async function assertApiSuccess<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const err: ActionRespTypeError = await res.json();
        console.error(`BizError ${err.code}: ${err.message}`);
        redirect(`/not-found?httpcode=${res.status}`);
    }

    const json: ActionRespTypeSuccess<T> = await res.json();
    return json.data!;
}
