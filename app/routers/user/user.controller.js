const Models = require('../../models');

exports.login = async (req, res, next) => {
  try {
    const body = req.body;

    const skillIds = JSON.parse(req.body.skillIds);
    const wantedSkillIds = JSON.parse(req.body.wantedSkillIds);
    const projectFieldIds = JSON.parse(req.body.projectFieldIds);

    const transaction = await Models.sequelize.transaction();

    const user = await Models.User.create(body);

    const skillArray = [];
    for (let skillId of skillIds) {
      skillArray.push({
        userId: user.id,
        skillId: skillId
      })
    }

    const userSkill = await Models.UserSkill.bulkCreate(skillArray, {
      individualHooks: true
    });

    const wantedSkillArray = [];
    for (let wantedSkillId of wantedSkillIds) {
      wantedSkillArray.push({
        userId: user.id,
        wantedSkillId: wantedSkillId
      })
    }

    const userWantedSkill = await Models.UserWantedSkill.bulkCreate(wantedSkillArray, {
      individualHooks: true
    });

    const projectFieldArray = [];
    for (let projectFieldId of projectFieldIds) {
      projectFieldArray.push({
        userId: user.id,
        projectFieldId: projectFieldId
      })
    }

    const userProjectField = await Models.UserProjectField.bulkCreate(projectFieldArray, {
      individualHooks: true
    });

    if (!user || !userSkill || !userWantedSkill || !userProjectField) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'user': user,
        'userSkill': userSkill,
        'userWantedSkill': userWantedSkill,
        'userProjectField': userProjectField
      }
    });
  }
  catch (error) {
    console.log('Error: ' + error.message);
    next(error);
  }
};

exports.showMyProfile = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const user = await Models.User.findOne({
      where: {
        id: myUserId
      },
      attributes: [
        'userNickname', 'userFirstJob', 'userSecondJob', 'userThirdJob',
        'introduction', 'portfolio', 'userImage',
        'highfiveNumber', 'passNumber'
        // ,
        // [
        //   [
        //     Models.sequelize.fn( 'COUNT',
        //       Models.sequelize.col( 'Followers.id' )
        //     ), 'followingNumber'
        //   ]
        // ],
        // [
        //   [
        //     Models.sequelize.fn( 'COUNT',
        //       Models.sequelize.col( 'Followings.id' )
        //     ), 'followingNumber'
        //   ]
        // ]
      ],
      include: [
        // {
        //   model: Models.User,
        //   as: 'Followers',
        //   attributes: [
        //     [
        //       Models.sequelize.fn( 'COUNT',
        //         Models.sequelize.col( 'Followers.id' )
        //       ), 'followingNumber'
        //     ]
        //   ]
        // },
        // {
        //   model: Models.User,
        //   as: 'Followings',
        //   attributes: [
        //     [
        //       Models.sequelize.fn( 'COUNT',
        //         Models.sequelize.col( 'Followings.id' )
        //       ), 'followerNumber'
        //     ]
        //   ]
        // },
        {
          model: Models.Skill,
          attributes: [ 'skillName' ],
          through: { attributes: [] }
        },
        {
          model: Models.Skill,
          as: 'WantedSkills',
          attributes: [ 'skillName' ],
          through: { attributes: [] }
        },
        {
          model: Models.ProjectField,
          attributes: [ 'projectFieldName' ],
          through: { attributes: [] }
        }
      ]
      // ,
      // group: [
      //   {
      //     model: Models.User,
      //     as: 'Followers'
      //   },
      //   {
      //     model: Models.User,
      //     as: 'Followings'
      //   }
      // ]
    });

    if (!user) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'user': user
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showOtherProfile = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const userId = parseInt(req.params.userId, 10);
    if (!userId) {
      return next(new Error('No userId'));
    }

    const user = await Models.User.findOne({
      where: {
        id: userId
      },
      attributes: [
        'userNickname', 'userFirstJob', 'userSecondJob', 'userThirdJob',
        'introduction', 'portfolio', 'userImage',
        'highfiveNumber', 'passNumber'
        // ,
        // [
        //   [
        //     Models.sequelize.fn( 'COUNT',
        //       Models.sequelize.col( 'Followers.id' )
        //     ), 'followingNumber'
        //   ]
        // ],
        // [
        //   [
        //     Models.sequelize.fn( 'COUNT',
        //       Models.sequelize.col( 'Followings.id' )
        //     ), 'followingNumber'
        //   ]
        // ]
      ],
      include: [
        // {
        //   model: Models.User,
        //   as: 'Followers',
        //   attributes: [
        //     [
        //       Models.sequelize.fn( 'COUNT',
        //         Models.sequelize.col( 'Followers.id' )
        //       ), 'followingNumber'
        //     ]
        //   ]
        // },
        // {
        //   model: Models.User,
        //   as: 'Followings',
        //   attributes: [
        //     [
        //       Models.sequelize.fn( 'COUNT',
        //         Models.sequelize.col( 'Followings.id' )
        //       ), 'followerNumber'
        //     ]
        //   ]
        // },
        {
          model: Models.Skill,
          attributes: [ 'skillName' ],
          through: { attributes: [] }
        },
        {
          model: Models.Skill,
          as: 'WantedSkills',
          attributes: [ 'skillName' ],
          through: { attributes: [] }
        },
        {
          model: Models.ProjectField,
          attributes: [ 'projectFieldName' ],
          through: { attributes: [] }
        }
      ]
      // ,
      // group: [
      //   {
      //     model: Models.User,
      //     as: 'Followers'
      //   },
      //   {
      //     model: Models.User,
      //     as: 'Followings'
      //   }
      // ]
    });

    if (!user) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'user': user
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showOtherBadges = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const id = parseInt(req.params.userId, 10);
    if (!id) {
      throw new Error("No id");
    }

    const user = await Models.User.findOne({
      where: {
        id: id
      },
      attributes: [
        'id'
      ],
      include: [{
        model: Models.UserBadge
      }]
    });

    if (!user) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'user': user
      }
    });
  }
  catch (error) {
    return next(error);
  }
}

exports.showUserList = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const myUserPoint = await Models.UserPlace.findAll({
      where: {
        userId: myUserId
      },
      attributes: [
        'coordinate'
      ]
    });

    const latitude = myUserPoint[0].dataValues.coordinate.coordinates[1];
    const longitude = myUserPoint[0].dataValues.coordinate.coordinates[0];

    const users = await Models.User.findAll({
      // where: {
      //
      // },
      attributes: [
        'id', 'userNickname', 'userImage', 'userFirstJob',
        [
          Models.sequelize.fn( 'ST_Distance_Sphere',
            Models.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
            Models.sequelize.col( 'UserPlace.coordinate' )
          ), 'distance'
        ]
      ],
      include: [
        {
          model: Models.Skill,
          attributes: [ 'skillName' ],
          through: { attributes: [] }
        },
        {
          model: Models.UserPlace,
          attributes: []
        }
      ],
      // having: {
      //   distance: {
      //     $between: [0.1, 10000]
      //   }
      // },
      order: [
        [
          Models.sequelize.fn( 'ST_Distance',
            Models.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
            Models.sequelize.col( 'UserPlace.coordinate' )
          ) , 'ASC'
        ]
      ]
    });

    if (!users) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'users': users
      }
    });
  }
  catch (error) {
    return next(error);
  }
}
