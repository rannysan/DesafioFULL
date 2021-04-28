export interface IServiceResponse<T> {
    data: T;
    success: boolean;
    message: string;
}
