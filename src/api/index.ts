export interface ApiSuccessResponse<TData = any> {
    success: true;
    data: TData;
}

export interface ApiErrorResponse {
    success: false;
    error: string;
}

export type ApiResponse<TData = any> =
    | ApiSuccessResponse<TData>
    | ApiErrorResponse;

export interface ApiUser {
    username: string;
}

export const apiLogin = async (
    username: string,
    password: string,
): Promise<ApiResponse<ApiUser>> => {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return response.json();
};

export const apiLogout = async (): Promise<ApiResponse> => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
    });

    return response.json();
};

export const apiFetchUser = async (): Promise<ApiResponse<ApiUser | null>> => {
    const response = await fetch('/api/user/info');

    return response.json();
};
