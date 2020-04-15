import * as Sentry from "@sentry/browser";

// const isLocal = process.env.NODE_ENV === "development";
const isLocal = false

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({dsn: "https://117d2ed4639446c98c1192168e9288ff@o378212.ingest.sentry.io/5201288"});
}

export function logError(error: any, errorInfo: any = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error: any) {
  let errorInfo: any  = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  alert(message);
}