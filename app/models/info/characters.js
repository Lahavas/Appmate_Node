
module.exports = (sequelize, DataType) => {
  const Character = sequelize.define('Character', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    characterName: { type: DataType.STRING, allowNull: false },
    characterImage: { type: DataType.STRING, allowNull: false }
  },
  {
    timestamps: false
  });

  return Character;
};
