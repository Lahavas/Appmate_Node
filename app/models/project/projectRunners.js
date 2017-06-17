const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const ProjectRunner = sequelize.define('ProjectRunner', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Project, key: 'id' }},
    runnerId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }}
  });

  ProjectRunner.associate = db => {
    // N:M Association, Many projects belongs to many applicants
    db.Project.belongsToMany(db.User, { as: 'Runners', through: db.ProjectRunner, foreignKey: 'projectId' });
    db.User.belongsToMany(db.Project, { as: 'Projects', through: db.ProjectRunner, foreignKey: 'runnerId' });
  };

  return ProjectRunner;
};
