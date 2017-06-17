const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserPlace = sequelize.define('UserPlace', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    address: { type: DataType.STRING, allowNull: false },
    coordinate: { type: DataType.GEOMETRY('POINT'), allowNull: false },
    // onlineFlag: { type: DataType.BOOLEAN, allowNull: false, defaultValue: false }
  });

  UserPlace.associate = db => {
    // 1:1 Association, One place belongs to one user
    db.User.hasOne(db.UserPlace, { foreignKey: 'userId' });
  };

  return UserPlace;
};
