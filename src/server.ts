import 'dotenv/config';
import app from './app';
import newSequelize from './database/db.config';
// ensure all models are loaded so Sequelize can sync them
import './database/entities/user.entity';
import './database/entities/survey.entity';
import './database/entities/survey-field.entity';
import './database/entities/survey-submission.entity';
import './database/entities/survey-answer.entity';
import { appConfig } from './common/config/app-config';

(async () => {
  try {
    await newSequelize().authenticate();
    console.log('Database connected');

    // sync models to database only in development (create/alter tables as needed)
    if (appConfig.APP_ENV === 'development') {
      await newSequelize().sync({ alter: true });
      console.log('Database synced (development mode)');
    }

    const PORT = appConfig.APP_PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
  }
})();
