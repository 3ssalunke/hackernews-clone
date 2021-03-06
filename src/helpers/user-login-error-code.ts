export enum UserLoginErrorCode {
  INCORRECT_PASSWORD = "pw",
  INVALID_ID = "invalid_id",
  LOGGED_IN = "loggedin",
  LOGIN_UNSUCCESSFUL = "unsuccessful",
  LOGIN_UPVOTE = "up",
  USERNAME_TAKEN = "id",
}

const UserLoginErrorCodeMessages: Record<UserLoginErrorCode, string> = {
  [UserLoginErrorCode.INCORRECT_PASSWORD]: "Incorrect Password",
  [UserLoginErrorCode.INVALID_ID]:
    "User ID must be between 3 and 32 characters",
  [UserLoginErrorCode.LOGGED_IN]:
    "Logged in user must logout before logging in again",
  [UserLoginErrorCode.LOGIN_UNSUCCESSFUL]: "Login unsuccessful",
  [UserLoginErrorCode.LOGIN_UPVOTE]: "You have to be logged in to vote",
  [UserLoginErrorCode.USERNAME_TAKEN]: "Username is taken",
};

export function getErrorMessageForLoginErrorCode(
  code: UserLoginErrorCode
): string {
  return UserLoginErrorCodeMessages[code];
}
