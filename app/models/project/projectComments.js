const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const ProjectComment = sequelize.define('ProjectComment', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Project, key: 'id' }},
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    commentContents: { type: DataType.STRING, allowNull: false }
  });

  ProjectComment.associate = db => {
    // 1:N Association, One project wants many comments
    db.Project.hasMany(db.ProjectComment, { foreignKey: 'projectId' });
    // 1:1 Association, One project's comment belongs to one user
    db.ProjectComment.belongsTo(db.User, { as: 'User', foreignKey: 'userId' });
  };

  return ProjectComment;
};
