const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserBadge = sequelize.define('UserBadge', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    badgeId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Badge, key: 'id' }}
  });

  UserBadge.associate = db => {
    // N:M Association, Many users belongs to many skills
    db.User.belongsToMany(db.Badge, { through: db.UserBadge, foreignKey: 'userId' });
    db.Badge.belongsToMany(db.User, { through: db.UserBadge, foreignKey: 'badgeId' });
  };

  return UserBadge;
};
