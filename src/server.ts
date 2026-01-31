import 'dotenv/config';
import app from './app';
import newSequelize from './database/db.config';
import { appConfig } from './common/app-config';
// import sequelize from './config/database';

(async () => {
  try {
    await newSequelize().authenticate();
    console.log('Database connected');

    const PORT = appConfig.APP_PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
  }
})();
