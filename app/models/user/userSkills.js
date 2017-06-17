const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserSkill = sequelize.define('UserSkill', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    skillId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Skill, key: 'id' }}
  });

  // Class Method
  UserSkill.associate = db => {
    // N:M Association, Many users belongs to many skills
    db.User.belongsToMany(db.Skill, { through: db.UserSkill, foreignKey: 'userId' });
    db.Skill.belongsToMany(db.User, { through: db.UserSkill, foreignKey: 'skillId' });
  };

  return UserSkill;
};
