const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserHighfive = sequelize.define('UserHighfive', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    highfiveId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
  });

  UserHighfive.associate = db => {
    // N:M Association, Many users belongs to many users to high five
    db.User.belongsToMany(db.User, { as: 'Users', through: db.UserHighfive, foreignKey: 'highfiveId' });
    db.User.belongsToMany(db.User, { as: 'Highfives', through: db.UserHighfive, foreignKey: 'userId' });
  };

  return UserHighfive;
};
