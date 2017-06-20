const Models = require('../../models');

exports.login = async (req, res, next) => {
  try {

    const userFirstJob = req.body.userFirstJob? req.body.userFirstJob : null;
    const userSecondJob = req.body.userSecondJob? req.body.userSecondJob : null;
    const userThirdJob = req.body.userThirdJob? req.body.userThirdJob : null;

    const user = await Models.User.create({
      userNickname: req.body.userNickname,
      userFirstJob: userFirstJob,
      userSecondJob: userSecondJob,
      userThirdJob: userThirdJob,
      introduction: req.body.introduction,
      portfolio: req.body.portfolio,
      userImage: req.body.userImage,
      identityId: req.body.identityId,
    });

    const skillNames = req.body.skillNames;
    const wantedSkillNames = req.body.wantedSkillNames;
    const projectFieldNames = req.body.projectFieldNames;

    const skillArray = [];
    for (let skillName of skillNames) {

      const skill = await Models.Skill.findOne({
        where: {
          skillName: skillName
        }
      });

      skillArray.push({
        userId: user.id,
        skillId: skill.id
      });
    }

    const wantedSkillArray = [];
    for (let wantedSkillName of wantedSkillNames) {

      const skill = await Models.Skill.findOne({
        where: {
          skillName: wantedSkillName
        }
      });

      wantedSkillArray.push({
        userId: user.id,
        wantedSkillId: skill.id
      });
    }

    const projectFieldArray = [];
    for (let projectFieldName of projectFieldNames) {

      const field = await Models.ProjectField.findOne({
        where: {
          projectFieldName: projectFieldName
        }
      });

      projectFieldArray.push({
        userId: user.id,
        projectFieldId: field.id
      });
    }

    const userSkill = await Models.UserSkill.bulkCreate(skillArray, {
      individualHooks: true
    });

    const userWantedSkill = await Models.UserWantedSkill.bulkCreate(wantedSkillArray, {
      individualHooks: true
    });

    const userProjectField = await Models.UserProjectField.bulkCreate(projectFieldArray, {
      individualHooks: true
    });

    if (!user || !userSkill || !userWantedSkill || !userProjectField) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'id': user.id
      }
    });
  }
  catch (error) {
    console.log('Error: ' + error.message);
    next(error);
  }
};

exports.verifyNickname = async (req, res, next) => {
  try {
    const userNickname = req.body.userNickname;

    const user = await Models.User.findOne({
      where: {
        userNickname : userNickname
      }
    });

    if (!user) {
      return res.status(201).json({
        'msg': 'failure'
      });
    }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showMyProfile = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const followerNumber = await Models.UserFollow.count({
      where: {
        followerId: myUserId
      }
    });

    const followingNumber = await Models.UserFollow.count({
      where: {
        followingId: myUserId
      }
    });

    const user = await Models.User.findOne({
      where: {
        id: myUserId
      },
      attributes: [
        'userNickname', 'userFirstJob', 'userSecondJob', 'userThirdJob',
        'introduction', 'portfolio', 'userImage',
        'highfiveNumber', 'passNumber'
      ],
      include: [
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
        },
        {
          model: Models.Identity,
          attributes: [ 'identityName' ]
        },
        {
          model: Models.UserPlace,
          attributes: [ 'address' ]
        }
      ]
    });

    user.dataValues.followerNumber = followerNumber;
    user.dataValues.followingNumber = followingNumber;

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

exports.showMyProject = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectRunning = await Models.Project.findAll({
      where: {
        projectState: '진행'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Runners',
          attributes: [],
          where: {
            id: myUserId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectComplete = await Models.Project.findAll({
      where: {
        projectState: '완료'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Runners',
          attributes: [],
          where: {
            id: myUserId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectApply = await Models.Project.findAll({
      where: {
        projectState: '모집'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Applicants',
          attributes: [],
          where: {
            id: myUserId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectRecruit = await Models.Project.findAll({
      where: {
        projectState: '모집'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          where: {
            id: myUserId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectLike = await Models.Project.findAll({
      // where: {
      //   projectState: '모집'
      // },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Likes',
          attributes: [],
          where: {
            id: myUserId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    if (!projectRunning || !projectComplete || !projectApply || !projectRecruit || !projectLike) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'projectRunning': projectRunning,
        'projectComplete': projectComplete,
        'projectApply': projectApply,
        'projectRecruit': projectRecruit,
        'projectLike': projectLike
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showMyFollowings = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const users = await Models.User.findAll({
      where: {
        id: myUserId
      },
      attributes: [],
      include: [
        {
          model: Models.User,
          as: 'Followings',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          through: { attributes: [] }
        }
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
};

exports.showMyFollowers = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const users = await Models.User.findAll({
      where: {
        id: myUserId
      },
      attributes: [],
      include: [
        {
          model: Models.User,
          as: 'Followers',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          through: { attributes: [] }
        }
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

    const followerNumber = await Models.UserFollow.count({
      where: {
        followerId: userId
      }
    });

    const followingNumber = await Models.UserFollow.count({
      where: {
        followingId: userId
      }
    });

    const user = await Models.User.findOne({
      where: {
        id: userId
      },
      attributes: [
        'userNickname', 'userFirstJob', 'userSecondJob', 'userThirdJob',
        'introduction', 'portfolio', 'userImage',
        'highfiveNumber', 'passNumber',
        [
          Models.sequelize.fn('COUNT',
            Models.sequelize.col('Followings.id')
          ), 'isFollow'
        ]
      ],
      include: [
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
        },
        {
          model: Models.Identity,
          attributes: [ 'identityName' ]
        },
        {
          model: Models.UserPlace,
          attributes: [ 'address' ]
        },
        {
          model: Models.User,
          as: 'Followings',
          attributes: [ 'id' ],
          through: {
            where: {
              'followingId': myUserId
            }
          }
        },
      ],
      group: [ 'Skills.id', 'WantedSkills.id', 'ProjectFields.id', 'UserPlace.id' ]
    });

    user.dataValues.followerNumber = followerNumber;
    user.dataValues.followingNumber = followingNumber;

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

exports.showOtherProject = async (req, res, next) => {
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

    const projectRunning = await Models.Project.findAll({
      where: {
        projectState: '진행'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Runners',
          attributes: [],
          where: {
            id: userId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectComplete = await Models.Project.findAll({
      where: {
        projectState: '완료'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Runners',
          attributes: [],
          where: {
            id: userId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectApply = await Models.Project.findAll({
      where: {
        projectState: '모집'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Applicants',
          attributes: [],
          where: {
            id: userId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    const projectRecruit = await Models.Project.findAll({
      where: {
        projectState: '모집'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          where: {
            id: userId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    // const projectTemp = await Models.Project.findAll({
    //   where: {
    //     projectState: '임시'
    //   },
    //   attributes: [
    //     'id', 'projectName',
    //     [
    //       Models.sequelize.fn('DATEDIFF',
    //         Models.sequelize.col('projectClosingDate'),
    //         Models.sequelize.col('projectOpeningDate')
    //       ), 'dDay'
    //     ]
    //   ],
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'Owner',
    //       attributes: [ 'id', 'userNickname', 'userImage' ],
    //       where: {
    //         id: userId
    //       }
    //     },
    //     {
    //       model: Models.ProjectBackground,
    //       attributes: [ 'projectBackgroundImage' ]
    //     }
    //   ]
    // });

    const projectLike = await Models.Project.findAll({
      // where: {
      //   projectState: '모집'
      // },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'Owner',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        },
        {
          model: Models.User,
          as: 'Likes',
          attributes: [],
          where: {
            id: userId
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      limit: 3,
      subQuery: false
    });

    if (!projectRunning || !projectComplete || !projectApply || !projectRecruit || !projectLike) {
      throw new Error("Error to create tuple");
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'projectRunning': projectRunning,
        'projectComplete': projectComplete,
        'projectApply': projectApply,
        'projectRecruit': projectRecruit,
        'projectLike': projectLike
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.setFollowing = async (req, res, next) => {
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

    if (req.body.check == 'true') {
      const userFollow = await Models.UserFollow.create({
        followingId: myUserId,
        followerId: userId
      });
    } else if (req.body.check == 'false') {
      const userFollow = await Models.UserFollow.destroy({
        where: {
          $and: [
            {
              followingId: myUserId
            },
            {
              followerId: userId
            }
          ]
        }
      });
    } else {
      return next(new Error('Must true or false'))
    }

    // const followerNumber = await Models.UserFollow.count({
    //   where: {
    //     followerId: userId
    //   }
    // });
    //
    // const followingNumber = await Models.UserFollow.count({
    //   where: {
    //     followingId: userId
    //   }
    // });
    //
    // const user = await Models.User.findOne({
    //   where: {
    //     id: userId
    //   },
    //   attributes: [
    //     'userNickname', 'userFirstJob', 'userSecondJob', 'userThirdJob',
    //     'introduction', 'portfolio', 'userImage',
    //     'highfiveNumber', 'passNumber',
    //     [
    //       Models.sequelize.fn('COUNT',
    //         Models.sequelize.col('Followings.id')
    //       ), 'isFollow'
    //     ]
    //   ],
    //   include: [
    //     {
    //       model: Models.Skill,
    //       attributes: [ 'skillName' ],
    //       through: { attributes: [] }
    //     },
    //     {
    //       model: Models.Skill,
    //       as: 'WantedSkills',
    //       attributes: [ 'skillName' ],
    //       through: { attributes: [] }
    //     },
    //     {
    //       model: Models.ProjectField,
    //       attributes: [ 'projectFieldName' ],
    //       through: { attributes: [] }
    //     },
    //     {
    //       model: Models.Identity,
    //       attributes: [ 'identityName' ]
    //     },
    //     {
    //       model: Models.UserPlace,
    //       attributes: [ 'address' ]
    //     },
    //     {
    //       model: Models.User,
    //       as: 'Followings',
    //       attributes: [ 'id' ],
    //       through: {
    //         where: {
    //           'followingId': myUserId
    //         }
    //       }
    //     },
    //   ],
    //   group: [ 'Skills.id', 'WantedSkills.id', 'ProjectFields.id', 'UserPlace.id' ]
    // });
    //
    // user.dataValues.followerNumber = followerNumber;
    // user.dataValues.followingNumber = followingNumber;
    //
    // if (!user) {
    //   throw new Error("Error to create tuple");
    // }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showOtherFollowings = async (req, res, next) => {
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

    const users = await Models.User.findAll({
      where: {
        id: userId
      },
      attributes: [],
      include: [
        {
          model: Models.User,
          as: 'Followings',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          through: { attributes: [] }
        }
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
};

exports.showOtherFollowers = async (req, res, next) => {
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

    const users = await Models.User.findAll({
      where: {
        id: userId
      },
      attributes: [],
      include: [
        {
          model: Models.User,
          as: 'Followers',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          through: { attributes: [] }
        }
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
};

// exports.setHighfive = async (req, res, next) => {
//   try {
//     // User Authorization
//     const myUserId = parseInt(req.headers.userid, 10);
//     if (!myUserId) {
//       return next(new Error('No myUserId'));
//     }
//
//     const userId = parseInt(req.params.userId, 10);
//     if (!userId) {
//       return next(new Error('No userId'));
//     }
//
//     const userHighfive = await Models.UserHighfive.create({
//       userId: myUserId,
//       highfiveId: userId
//     });
//
//     const user = await Models.User.findById(myUserId);
//     user.increment('highfiveNumber');
//
//     if (!user) {
//       throw new Error("Error to create tuple");
//     }
//
//     return res.status(201).json({
//       'msg': 'success'
//     });
//   }
//   catch (error) {
//     return next(error);
//   }
// };

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
      where: {
        id: {
          $not: myUserId
        }
      },
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
      having: {
        userId: {
          $not: myUserId
        }
      },
      order: [
        [
          Models.sequelize.fn( 'ST_Distance_Sphere',
            Models.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
            Models.sequelize.col( 'UserPlace.coordinate' )
          ) , 'ASC'
        ]
      ]
      // ,
      // limit: 20,
      // subQuery: false
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

exports.showUserMapList = async (req, res, next) => {
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
      where: {
        id: {
          $not: myUserId
        }
      },
      attributes: [
        'id', 'userNickname', 'userImage', 'userFirstJob',
        [
          Models.sequelize.fn( 'X',
            Models.sequelize.col( 'UserPlace.coordinate' )
          ), 'latitude'
        ],
        [
          Models.sequelize.fn( 'Y',
            Models.sequelize.col( 'UserPlace.coordinate' )
          ), 'longitude'
        ],
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
      having: {
        userId: {
          $not: myUserId
        }
        // ,
        // distance: {
        //   between: [0, 20000]
        // }
      },
      order: [
        [
          Models.sequelize.fn( 'ST_Distance_Sphere',
            Models.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
            Models.sequelize.col( 'UserPlace.coordinate' )
          ) , 'ASC'
        ]
      ]
      // ,
      // limit: 20,
      // subQuery: false
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

exports.showUserMapListWithPoint = async (req, res, next) => {
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

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const users = await Models.User.findAll({
      where: {
        id: {
          $not: myUserId
        }
      },
      attributes: [
        'id', 'userNickname', 'userImage', 'userFirstJob',
        [
          Models.sequelize.fn( 'X',
            Models.sequelize.col( 'UserPlace.coordinate' )
          ), 'latitude'
        ],
        [
          Models.sequelize.fn( 'Y',
            Models.sequelize.col( 'UserPlace.coordinate' )
          ), 'longitude'
        ],
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
      having: {
        userId: {
          $not: myUserId
        }
        // ,
        // distance: {
        //   between: [0, 20000]
        // }
      },
      order: [
        [
          Models.sequelize.fn( 'ST_Distance_Sphere',
            Models.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
            Models.sequelize.col( 'UserPlace.coordinate' )
          ) , 'ASC'
        ]
      ]
      // ,
      // limit: 20,
      // subQuery: false
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
