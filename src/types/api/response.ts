export type ActionRespType<T> =
    | {
        status: Status.SUCCESS
        code: number,
        data: T[]
    }
    | {
        status: Status.ERROR
        code: number,
        message: string
    }