export interface LoginModel {
    emailAddress : string,
    password: string,
}


export interface LoginResponseModel {
    accessToken: string;
    refreshToken: string;
    userInfo: {
        id: string;
        emailAddress: string;
        role:string;
        // Add other user info fields as needed
    };
}