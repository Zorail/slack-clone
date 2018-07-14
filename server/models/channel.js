export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
  });

  Channel.associate = (models) => {
    //   1:M
    Channel.belongsTo(models.Team, {
      foreignKey: 'teamlId',
    });
  };

  return Channel;
};
