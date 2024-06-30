// backend/src/server.js
const dotenv = require('dotenv');
dotenv.config();

try {
  const app = require('./app');

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting the server:', error);
}