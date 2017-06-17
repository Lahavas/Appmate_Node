
module.exports = (sequelize, DataType) => {
  const ProjectField = sequelize.define('ProjectField', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectFieldName: { type: DataType.STRING, allowNull: false }
  },
  {
    timestamps: false
  });

  return ProjectField;
};
