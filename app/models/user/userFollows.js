const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserFollow = sequelize.define('UserFollow', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    followingId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    followerId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
  });

  UserFollow.associate = db => {
    // N:M Association, Many follow users belongs to many following users
    db.User.belongsToMany(db.User, { as: 'Followers', through: db.UserFollow, foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { as: 'Followings', through: db.UserFollow, foreignKey: 'followerId' });
  };

  return UserFollow;
};
