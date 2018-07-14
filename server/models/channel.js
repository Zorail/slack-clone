export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
  }, {
    underscored: true,
  });

  Channel.associate = (models) => {
    // 1:M
    Channel.belongsTo(models.Team, {
      //  To convert inot camelcase
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
  };

  return Channel;
};
