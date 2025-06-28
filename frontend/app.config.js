// app.config.js
export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL,
      // Add more env variables as needed
    },
  };
};
