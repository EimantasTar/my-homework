export interface Camp {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    Budget: number,
    userId: number,
}

export interface CampsState {
    isFetching: boolean,
    data: Camp[],
    error: null | string | Error,
}
