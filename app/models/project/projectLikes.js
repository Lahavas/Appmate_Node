const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const ProjectLike = sequelize.define('ProjectLike', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Project, key: 'id' }},
    likeUserId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }}
  });

  ProjectLike.associate = db => {
    // N:M Association, Many projects belongs to many like users
    db.Project.belongsToMany(db.User, { as: 'Likes', through: db.ProjectLike, foreignKey: 'projectId' });
    db.User.belongsToMany(db.Project, { as: 'Projects', through: db.ProjectLike, foreignKey: 'likeUserId' });
  };

  return ProjectLike;
};
