require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const setupSocket = require('./config/socket');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ force: false });
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

setupSocket(server);