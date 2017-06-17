
module.exports = (sequelize, DataType) => {
  const Skill = sequelize.define('Skill', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    skillName: { type: DataType.STRING, allowNull: false },
    skillField: { type: DataType.STRING, allowNull: false }
  },
  {
    timestamps: false
  });

  return Skill;
};
