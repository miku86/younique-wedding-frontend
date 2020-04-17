const dev = {
  Auth: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_S1et4IKBG",
    IDENTITY_POOL_ID: "eu-central-1:3e58b936-1fee-41f7-8d59-bd69404d10f8",
    APP_CLIENT_ID: "5p93948bncuuv69pr8ecab1e0s"
  },
  API: {
    REGION: "eu-central-1",
    NAME: "dev-younique-wedding-api-2",
    ENDPOINT: "https://8wydy5fq89.execute-api.eu-central-1.amazonaws.com/dev"
  },
  Analytics: {
    DISABLED: true
  }
};

const prod = {
  Auth: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_s0IJLvhMY",
    IDENTITY_POOL_ID: "eu-central-1:52128057-f07c-4aa4-aca7-4037bc5648c5",
    APP_CLIENT_ID: "639ac8il0t46tpnqclum4v3jmp"
  },
  API: {
    REGION: "eu-central-1",
    NAME: "dev-younique-wedding-api-2",
    ENDPOINT: "https://lzpnfx9d33.execute-api.eu-central-1.amazonaws.com/prod"
  },
  Analytics: {
    DISABLED: true
  }
};

export const API = {
  TODOS: "/todos",
  GUESTS: "/guests",
  BUDGET: "/budget",
  SETTINGS: "/settings",
  LOGIN: "/login",
  SIGNUP: "/signup"
}

export const ROUTE = {
  TODOS: "/todos",
  GUESTS: "/guests",
  BUDGET: "/budget",
  SETTINGS: "/settings",
  LOGIN: "/login",
  SIGNUP: "/signup"
}

export const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export const demoUser = {
  email: "demo@miku86.com",
  password: "demo2020"
};
