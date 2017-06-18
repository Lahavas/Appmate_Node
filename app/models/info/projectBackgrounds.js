
module.exports = (sequelize, DataType) => {
  const ProjectBackground = sequelize.define('ProjectBackground', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    projectBackgroundImage: { type: DataType.STRING, allowNull: false }
  },
  {
    timestamps: false
  });

  return ProjectBackground;
};
