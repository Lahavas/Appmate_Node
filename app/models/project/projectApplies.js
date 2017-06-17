const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const ProjectApply = sequelize.define('ProjectApply', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Project, key: 'id' }},
    applicantId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }}
  });

  ProjectApply.associate = db => {
    // N:M Association, Many projects belongs to many applicants
    db.Project.belongsToMany(db.User, { as: 'Applicants', through: db.ProjectApply, foreignKey: 'projectId' });
    db.User.belongsToMany(db.Project, { as: 'Projects', through: db.ProjectApply, foreignKey: 'applicantId' });
  };

  return ProjectApply;
};
