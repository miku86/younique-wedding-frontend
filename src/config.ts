const dev = {
  Auth: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_S1et4IKBG",
    IDENTITY_POOL_ID: "eu-central-1:3e58b936-1fee-41f7-8d59-bd69404d10f8",
    APP_CLIENT_ID: "5p93948bncuuv69pr8ecab1e0s",
  },
  API: {
    REGION: "eu-central-1",
    NAME: "dev-younique-wedding-api-2",
    ENDPOINT: "https://8wydy5fq89.execute-api.eu-central-1.amazonaws.com/dev",
  },
  Analytics: {
    DISABLED: true,
  },
};

const prod = {
  Auth: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_s0IJLvhMY",
    IDENTITY_POOL_ID: "eu-central-1:52128057-f07c-4aa4-aca7-4037bc5648c5",
    APP_CLIENT_ID: "639ac8il0t46tpnqclum4v3jmp",
  },
  API: {
    REGION: "eu-central-1",
    NAME: "dev-younique-wedding-api-2",
    ENDPOINT: "https://lzpnfx9d33.execute-api.eu-central-1.amazonaws.com/prod",
  },
  Analytics: {
    DISABLED: true,
  },
};

export const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export const amplifyConfig = {
  Auth: {
    mandatorySignIn: true,
    region: config.Auth.REGION,
    userPoolId: config.Auth.USER_POOL_ID,
    identityPoolId: config.Auth.IDENTITY_POOL_ID,
    userPoolWebClientId: config.Auth.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: config.API.NAME,
        endpoint: config.API.ENDPOINT,
        region: config.API.REGION,
      },
    ],
  },
  Analytics: {
    disabled: config.Analytics.DISABLED,
  },
};

export const API = {
  DASHBOARD: "/dashboard",
  TODOS: "/todos",
  GUESTS: "/guests",
  BUDGET: "/budget",
  SETTINGS: "/settings",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const ROUTES = {
  TODOS: "/todos",
  TODOSNEW: "/todos/new",
  GUESTS: "/guests",
  GUESTSNEW: "/guests/new",
  BUDGET: "/budget",
  BUDGETNEW: "/budget/new",
  SETTINGS: "/settings",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const demoUser = {
  email: "demo@miku86.com",
  password: "demo2020",
};
