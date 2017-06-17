const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserWantedSkill = sequelize.define('UserWantedSkill', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    wantedSkillId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Skill, key: 'id' }}
  });

  // Class Method
  UserWantedSkill.associate = db => {
    // N:M Association, Many users belongs to many user's wanted skills
    db.User.belongsToMany(db.Skill, { as: 'WantedSkills', through: db.UserWantedSkill, foreignKey: 'userId' });
    db.Skill.belongsToMany(db.User, { as: 'WantedSkills', through: db.UserWantedSkill, foreignKey: 'wantedSkillId' });
  };

  return UserWantedSkill;
};
