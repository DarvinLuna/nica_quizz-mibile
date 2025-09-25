export namespace NicaQuizz {
    export type AuthenticatedStackParamList = {
        HomeScreen: undefined;
        AttendanceScreen: undefined;
    };

    export type UnauthenticatedStackParamList = {
        LoginScreen: undefined;
        RegisterScreen: undefined;
    };
    export type LoginResponse = {
        access: string;
        refresh: string;
    };
    export type LoginPayload = {
        username: string;
        password: string;
    };
    export type ErrorResponse = {
        rejectValue: Record<string, string | undefined>;
    };
    export type AuthState = {
        access: string | null;
        refresh: string | null;
        isLoading: boolean;
        errors: Record<string, string | undefined>;
    };
    export type ThemeColorKey = 'primary' | 'secondary' | 'accent' | 'error';

}