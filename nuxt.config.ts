// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  auth: {
    baseURL: process.env.NEXTAUTH_URL,
    provider: {
      type: "authjs",
    },
  },
  runtimeConfig: {
    appUrl: process.env.NEXTAUTH_URL,
    mysqlHost: process.env.NUXT_MYSQL_HOST,
    mysqlPort: process.env.NUXT_MYSQL_PORT,
    mysqlDatabase: process.env.NUXT_MYSQL_DATABASE,
    mysqlUser: process.env.NUXT_MYSQL_USER,
    mysqlPassword: process.env.NUXT_MYSQL_PASSWORD,
    authSecret: process.env.AUTH_SECRET,
  },
});
