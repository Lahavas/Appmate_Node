const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserProjectField = sequelize.define('UserProjectField', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    projectFieldId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.ProjectField, key: 'id' }}
  });

  UserProjectField.associate = db => {
    // N:M Association, Many users belongs to many project fields
    db.User.belongsToMany(db.ProjectField, { through: db.UserProjectField, foreignKey: 'userId' });
    db.ProjectField.belongsToMany(db.User, { through: db.UserProjectField, foreignKey: 'projectFieldId' });
  };

  return UserProjectField;
};
