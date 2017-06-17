
module.exports = (sequelize, DataType) => {
  const Badge = sequelize.define('Badge', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    badgeName: { type: DataType.STRING, allowNull: false }
  },
  {
    timestamps: false
  });

  return Badge;
};
