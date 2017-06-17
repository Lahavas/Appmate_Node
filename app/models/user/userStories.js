const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const UserStory = sequelize.define('UserStory', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.User, key: 'id' }},
    image: { type: DataType.STRING, allowNull: false },
    //thumbnailImage: { type: DataType.STRING, allowNull: false }
  });

  UserStory.associate = db => {
    // 1:N Association, One user has many images
    db.User.hasMany(db.UserStory, { foreignKey: 'userId' });
  };

  return UserStory;
};
