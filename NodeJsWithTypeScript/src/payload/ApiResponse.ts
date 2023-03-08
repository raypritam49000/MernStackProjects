interface ApiResponse {
    isSuccess: boolean,
    status: string,
    statusCode: number,
    message: string,
    data?: any
}

export default ApiResponse;