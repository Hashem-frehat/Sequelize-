module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,

      userId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  Task.associate = function (models) {
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Task;
};
