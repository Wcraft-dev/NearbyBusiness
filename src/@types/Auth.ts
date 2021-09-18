import { FirebaseError } from "@firebase/util";

enum FirebaseAuthErrorCode {
  /** The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes */
  "auth/claims-too-large" = "auth/claims-too-large",
  /** The provided email is already in use by an existing user. Each user must have a unique email. */
  "auth/email-already-exists" = "auth/email-already-exists",
  /** The provided Firebase ID token is expired. */
  "auth/id-token-expired" = "auth/id-token-expired",
  /** The Firebase ID token has been revoked. */
  "auth/id-token-revoked" = "auth/id-token-revoked",
  /** The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.*/
  "auth/insufficient-permission" = "auth/insufficient-permission",
  /** The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.*/
  "auth/internal-error" = "auth/internal-error",
  /** An invalid argument was provided to an Authentication method. The error message should contain additional information. */
  "auth/invalid-argument" = "auth/invalid-argument",
  /** The custom claim attributes provided to setCustomUserClaims() are invalid. */
  "auth/invalid-claims" = "auth/invalid-claims",
  /** The continue URL must be a valid URL string. */
  "auth/invalid-continue-uri" = "auth/invalid-continue-uri",
  /** The creation time must be a valid UTC date string. */
  "auth/invalid-creation-time" = "auth/invalid-creation-time",
  /** The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. See Initialize the SDK for documentation on how to authenticate the Admin SDKs with a certificate credential. */
  "auth/invalid-credential" = "auth/invalid-credential",
  /** The provided value for the disabled user property is invalid. It must be a boolean. */
  "auth/invalid-disabled-field" = "auth/invalid-disabled-field",
  /** The provided value for the displayName user property is invalid. It must be a non-empty string. */
  "auth/invalid-display-name" = "auth/invalid-display-name",
  /** The provided dynamic link domain is not configured or authorized for the current project. */
  "auth/invalid-dynamic-link-domain" = "auth/invalid-dynamic-link-domain",
  /** The provided value for the email user property is invalid. It must be a string email address.*/
  "auth/invalid-email" = "auth/invalid-email",
  /** The provided value for the emailVerified user property is invalid. It must be a boolean. */
  "auth/invalid-email-verified" = "auth/invalid-email-verified",
  /** The hash algorithm must match one of the strings in the list of supported algorithms. */
  "auth/invalid-hash-algorithm" = "auth/invalid-hash-algorithm",
  /** The hash block size must be a valid number. */
  "auth/invalid-hash-block-size" = "auth/invalid-hash-block-size",
  /** The hash derived key length must be a valid number. */
  "auth/invalid-hash-derived-key-length" = "auth/invalid-hash-derived-key-length",
  /** The hash key must a valid byte buffer. */
  "auth/invalid-hash-key" = "auth/invalid-hash-key",
  /** The hash memory cost must be a valid number. */
  "auth/invalid-hash-memory-cost" = "auth/invalid-hash-memory-cost",
  /** The hash parallelization must be a valid number. */
  "auth/invalid-hash-parallelization" = "auth/invalid-hash-parallelization",
  /** The hash rounds must be a valid number. */
  "auth/invalid-hash-rounds" = "auth/invalid-hash-rounds",
  /** The hashing algorithm salt separator field must be a valid byte buffer.*/
  "auth/invalid-hash-salt-separator" = "auth/invalid-hash-salt-separator",
  /** The provided ID token is not a valid Firebase ID token. */
  "auth/invalid-id-token" = "auth/invalid-id-token",
  /** The last sign-in time must be a valid UTC date string. */
  "auth/invalid-last-sign-in-time" = "auth/invalid-last-sign-in-time",
  /** The provided next page token in listUsers() is invalid. It must be a valid non-empty string. */
  "auth/invalid-page-token" = "auth/invalid-page-token",
  /** The provided value for the password user property is invalid. It must be a string with at least six characters. */
  "auth/invalid-password" = "auth/invalid-password",
  /** The password hash must be a valid byte buffer. */
  "auth/invalid-password-hash" = "auth/invalid-password-hash",
  /** The password salt must be a valid byte buffer. */
  "auth/invalid-password-salt" = "auth/invalid-password-salt",
  /** The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string. */
  "auth/invalid-phone-number" = "auth/invalid-phone-number",
  /** The provided value for the photoURL user property is invalid. It must be a string URL. */
  "auth/invalid-photo-url" = "auth/invalid-photo-url",
  /** The providerData must be a valid array of UserInfo objects. */
  "auth/invalid-provider-data" = "auth/invalid-provider-data",
  /** The providerId must be a valid supported provider identifier string. */
  "auth/invalid-provider-id" = "auth/invalid-provider-id",
  /** Only exactly one OAuth responseType should be set to true.  */
  "auth/invalid-oauth-responsetype" = "auth/invalid-oauth-responsetype",
  /** The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks. */
  "auth/invalid-session-cookie-duration" = "auth/invalid-session-cookie-duration",
  /** The provided uid must be a non-empty string with at most 128 characters. */
  "auth/invalid-uid" = "auth/invalid-uid",
  /** The user record to import is invalid. */
  "auth/invalid-user-import" = "auth/invalid-user-import",
  /** The maximum allowed number of users to import has been exceeded. */
  "auth/maximum-user-count-exceeded" = "auth/maximum-user-count-exceeded",
  /** An Android Package Name must be provided if the Android App is required to be installed. */
  "auth/missing-android-pkg-name" = "auth/missing-android-pkg-name",
  /** A valid continue URL must be provided in the request. */
  "auth/missing-continue-uri" = "auth/missing-continue-uri",
  /** Importing users with password hashes requires that the hashing algorithm and its parameters be provided. */
  "auth/missing-hash-algorithm" = "auth/missing-hash-algorithm",
  /** The request is missing an iOS Bundle ID. */
  "auth/missing-ios-bundle-id" = "auth/missing-ios-bundle-id",
  /** A uid identifier is required for the current operation. */
  "auth/missing-uid" = "auth/missing-uid",
  /** The OAuth configuration client secret is required to enable OIDC code flow. */
  "auth/missing-oauth-client-secret" = "auth/missing-oauth-client-secret",
  /** The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console. */
  "auth/operation-not-allowed" = "auth/operation-not-allowed",
  /** The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber. */
  "auth/phone-number-already-exists" = "auth/phone-number-already-exists",
  /** No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs. */
  "auth/project-not-found" = "auth/project-not-found",
  /** One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims. */
  "auth/reserved-claims" = "auth/reserved-claims",
  /** The provided Firebase session cookie is expired. */
  "auth/session-cookie-expired" = "auth/session-cookie-expired",
  /** The Firebase session cookie has been revoked. */
  "auth/session-cookie-revoked" = "auth/session-cookie-revoked",
  /** The provided uid is already in use by an existing user. Each user must have a unique uid. */
  "auth/uid-already-exists" = "auth/uid-already-exists",
  /** The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console. */
  "auth/unauthorized-continue-uri" = "auth/unauthorized-continue-uri",
  /** There is no existing user record corresponding to the provided identifier. */
  "auth/user-not-found" = "auth/user-not-found",
  /** Thrown if there already exists an account with the email address asserted by the credential. Resolve this by calling firebase.auth.Auth.fetchSignInMethodsForEmail with the error.email and then asking the user to sign in using one of the returned providers*/
  "auth/account-exists-with-different-credential" = "auth/account-exists-with-different-credential",
  /** Thrown if the account corresponding to the credential already exists among your users, or is already linked to a Firebase User */
  "auth/credential-already-in-use" = "auth/credential-already-in-use",
  /** Thrown if the email corresponding to the credential already exists among your users. When thrown while linking a credential to an existing user, an error.email and error.credential (firebase.auth.AuthCredential) fields are also provided */
  "auth/email-already-in-use" = "auth/email-already-in-use",
  /** Thrown if the password reset code has expired. */
  "auth/expired-action-code" = "auth/expired-action-code",
  /**Thrown if the password reset code is invalid. This can happen if the code is malformed or has already been used.*/
  "auth/invalid-action-code" = "auth/invalid-action-code",
  /**Thrown if the user corresponding to the given password reset code has been disabled.*/
  "auth/user-disabled" = "auth/user-disabled",
  /**Thrown if the new password is not strong enough.*/
  "auth/weak-password" = "auth/weak-password",
  /** Thrown if the password used in a firebase.auth.EmailAuthProvider.credential is not correct or when the user associated with the email does not have a password. */
  "auth/wrong-password" = "auth/wrong-password",
  /**Thrown if the popup was blocked by the browser, typically when this operation is triggered outside of a click handler.*/
  "auth/popup-blocked" = "auth/popup-blocked",
  /**Thrown if the popup window is closed by the user without completing the sign in to the provider.*/
  "auth/popup-closed-by-user" = "auth/popup-closed-by-user",
  /**  The caller does not have permission to execute the specified operation. */
  "permission-denied" = "permission-denied",
}

export interface IFirebaseError extends FirebaseError {
  code: FirebaseAuthErrorCode;
  message: string;
  stack?: string;
}
export type AuthDataSign = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  business?: string;
  type?: string;
};

export enum AuthRole {
  NORMAL = "NORMAL",
  EMPRESARIO = "EMPRESARIO",
}
export enum AuthHomePath {
  NORMAL_PATH = "/productos",
  EMPRESARIO_PATH = "/dashboard",
}

export type State = {
  userToken: string;
  role: AuthRole | null;
  homePath: AuthHomePath | null;
  business: string;
};

export type AuthContextType = {
  UserData: State;
  signIn: (data: AuthDataSign) => Promise<boolean>;
  signUp: (data: AuthDataSign) => Promise<boolean>;
  signOut: () => Promise<void>;
  googleSingIn: () => void;
  accessRoute: (route: routeType) => boolean;
};

export type routeType = {
  path: string;
  displayName?: string;
  show: boolean;
  shadow?: boolean;
  component: (param: any) => JSX.Element;
  permission?: AuthRole;
};

export type routesType = routeType[];

export enum ActionKind {
  AUTH = "AUTH_USER",
  SIGN_OUT = "SIGN_OUT_USER",
}

export type Action = {
  type: ActionKind;
  payload: State;
};

export const AuthAction: Action = {
  type: ActionKind.AUTH,
  payload: {} as State,
};

export const SignOutAction: Action = {
  type: ActionKind.SIGN_OUT,
  payload: {} as State,
};

export type ReducerAuth<State, Action> = (
  state: State,
  action: Action
) => State;
