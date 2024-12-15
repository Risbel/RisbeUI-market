export const config = {
  KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID as string,
  KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET as string,
  KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL as string,
  KINDE_SITE_URL: process.env.KINDE_SITE_URL as string,
  KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL as string,
  KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL as string,

  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET as string,
  UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN as string,
  UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID as string,

  DATABASE_URL: process.env.DATABASE_URL as string,
  DIRECT_URL: process.env.DIRECT_URL as string,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
  STRIPE_CONNECT_WEBHOOK_SECRET: process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string,
  STRIPE_CHECKOUT_WEBHOOK_SECRET: process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET as string,

  RESEND_API_KEY: process.env.RESEND_API_KEY as string,

  BASE_URL_CLIENT: process.env.BASE_URL_CLIENT as string,
};
