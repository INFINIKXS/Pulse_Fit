// app.config.js
export default ({ config }) => {
  return {
    ...config,
    plugins: [
      "expo-secure-store"
    ],
    extra: {
      API_URL: process.env.API_URL,
      // Add more env variables as needed
    },
  };
};
