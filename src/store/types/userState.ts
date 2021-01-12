export interface User {
    id: number,
    name: string,
}

export interface UserState {
    isFetching: boolean,
    data: User[],
    error: null | string | Error,
}
