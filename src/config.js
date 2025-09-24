const config = {
  oauthClientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
  proxyDomain: import.meta.env.VITE_PROXY_DOMAIN,
  baseUrl: import.meta.env.BASE_URL,
  learningPlatformApi:
    import.meta.env.VITE_LEARNING_PLATFORM_API,
  courseName: "Introduction to the Cloud",
  doAuth: false,
};

export default config;