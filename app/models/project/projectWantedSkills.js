const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const ProjectWantedSkill = sequelize.define('ProjectWantedSkill', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Project, key: 'id' }},
    wantedSkillId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Skill, key: 'id' }}
  });

  ProjectWantedSkill.associate = db => {
    // N:M Association, Many projects belongs to many project's wanted skills
    db.Project.belongsToMany(db.Skill, { through: db.ProjectWantedSkill, foreignKey: 'projectId' });
    db.Skill.belongsToMany(db.Project, { through: db.ProjectWantedSkill, foreignKey: 'wantedSkillId' });
  };

  return ProjectWantedSkill;
};
