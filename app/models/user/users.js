const Models = require('../index');

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

    // fcm 기능 구현시
    // fcmRegistrationId: { type: DataType.STRING, allowNull: false, unique: true },

    // 로그인 기능 구현시 (JWT 내용)
    // userSocial: { type: DataType.STRING, allowNull: false },
    // userSocialId: { type: DataType.INTEGER, allowNull: false },
    // userName: { type: DataType.STRING, allowNull: false },
    // userEmail: { type: DataType.STRING, allowNull: false },

    userNickname: { type: DataType.STRING, allowNull: false },
    userFirstJob: { type: DataType.STRING },
    userSecondJob: { type: DataType.STRING },
    userThirdJob: { type: DataType.STRING },
    introduction: { type: DataType.STRING , allowNull: false, defaultValue: '' },
    portfolio: { type: DataType.STRING },
    userImage: { type: DataType.STRING, allowNull: false },

    identityId: { type: DataType.INTEGER, allowNull: false, references: { model: Models.Identity, key: 'id' }},

    // character 기능 구현시
    // characterId: { type: DataType.INTEGER, allowNull: false , references: { model: Models.Character, key: 'id' }},

    // 회사 인중 구현시
    // corpAuthFlag: { type: DataType.BOOLEAN, allowNull: false, defaultValue: false },

    highfiveNumber: { type: DataType.INTEGER, allowNull: false, defaultValue: 0 },
    PassNumber: { type: DataType.INTEGER, allowNull: false, defaultValue: 0 }
  });

  User.associate = db => {

    // 1:1 Association, One user belongs to one identity
    db.User.belongsTo(db.Identity, { foreignKey: 'identityId' });
    // character 기능 구현시
    // // 1:1 Association, One user belongs to one character
    // db.User.belongsTo(db.Character, { foreignKey: 'characterId' });
  };

  return User;
};
