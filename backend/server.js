const app = require('./app');

const PORT = process.env.PORT || 4000;

// Export handler for serverless platforms (Vercel, Railway, etc.)
module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
