const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const ProjectAppliedField = sequelize.define('ProjectAppliedField', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Project, key: 'id' }},
    projectFieldId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.ProjectField, key: 'id' }}
  });

  ProjectAppliedField.associate = db => {
    // N:M Association, Many projects belongs to many project's wanted skills
    db.Project.belongsToMany(db.ProjectField, { through: db.ProjectAppliedField, foreignKey: 'projectId' });
    db.ProjectField.belongsToMany(db.Project, { through: db.ProjectAppliedField, foreignKey: 'projectFieldId' });
  };

  return ProjectAppliedField;
};
