
module.exports = (sequelize, DataType) => {
  const Identity = sequelize.define('Identity', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    identityName: { type: DataType.STRING, allowNull: false }
  },
  {
    timestamps: false
  });

  return Identity;
};
