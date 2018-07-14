import Sequelize from 'sequelize';
import config from './config'

const sequelize = new Sequelize(config.database, config.username, config.password);

const models = {
  user: sequelize.import('./user'),
  channel: sequelize.import('./channel'),
  team: sequelize.import('./team'),
  member: sequelize.import('./member'),
  message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
