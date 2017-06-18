const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const Project = sequelize.define('Project', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    ownerId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    projectName: { type: DataType.STRING, allowNull: false },
    projectBackgroundId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.ProjectBackground, key: 'id' }},
    projectMemberNumber: { type: DataType.INTEGER, allowNull: false },
    projectDescription: { type: DataType.TEXT },
    projectState: { type: DataType.STRING, allowNull: false },
    isPass: { type: DataType.BOOLEAN, allowNull: false, defaultValue: 0 },
    // projectStartTerm: { type: DataType.DATEONLY, allowNull: false },
    // projectEndTerm: { type: DataType.DATEONLY, allowNull: false },
    projectOpeningDate: { type: DataType.DATE, allowNull: false, defaultValue: new Date() },
    projectClosingDate: { type: DataType.DATE, allowNull: false }
  });

  Project.associate = db => {
    // 1:1 Association, One project has one owner
    db.Project.belongsTo(db.User, { as: 'Owner', foreignKey: 'ownerId' });
    // 1:1 Association, One user belongs to one identity
    db.Project.belongsTo(db.ProjectBackground, { foreignKey: 'projectBackgroundId' });
  };

  return Project;
};
