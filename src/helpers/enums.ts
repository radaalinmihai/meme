export enum ResponseCodes {
	OK = "OK",
	REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
	SESSION_EXPIRED = "SESSION_EXPIRED",
	NO_PROFILE = "NO_PROFILE",
	INTERNAL_ERROR = "INTERNAL_ERROR",
}

export enum StatusCodes {
	BadRequest = 400,
	InternalServerError = 500,
	ForbiddenAccess = 403,
}
