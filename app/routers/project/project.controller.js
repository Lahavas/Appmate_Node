const Models = require('../../models');

exports.showProjectList = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projects = await Models.Project.findAll({
      where: {
        'ownerId': {
          $not: myUserId
        },
        'projectClosingDate': {
          $gt: new Date()
        },
        'projectState': '모집'
      },
      attributes: [
        'id', 'projectName',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ],
        [
          Models.sequelize.fn('COUNT',
            Models.sequelize.col('Likes.id')
          ), 'isLike'
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
          through: {
            where: {
              'likeUserid': myUserId
            }
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      order: [
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ) , 'ASC'
        ]
      ],
      group: [ 'id' ],
      limit: 10,
      subQuery: false
    });

    if (!projects) {
      return next(new Error('Error to create tuple'));
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'projects': projects
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.setProject = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const wantedSkillNames = req.body.wantedSkillNames;
    const projectFieldNames = req.body.projectFieldNames;

    const project = await Models.Project.create({
      projectName: req.body.projectName,
      projectBackgroundId: req.body.projectBackgroundId,
      projectMemberNumber: req.body.projectMemberNumber,
      projectDescription: req.body.projectDescription,
      projectState: req.body.projectState,
      isPass: req.body.isPass,
      projectOpeningDate: new Date(),
      projectClosingDate: req.body.projectClosingDate,
      ownerId: myUserId
    });

    const projectId = project.id;

    const wantedSkillArray = [];
    for (let wantedSkillName of wantedSkillNames) {

      const skill = await Models.Skill.findOne({
        where: {
          skillName: wantedSkillName
        }
      });

      wantedSkillArray.push({
        projectId: projectId,
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
        projectId: projectId,
        projectFieldId: field.id
      });
    }

    const projectWantedSkill = await Models.ProjectWantedSkill.bulkCreate(wantedSkillArray, {
      individualHooks: true
    });

    const projectAppliedField = await Models.ProjectAppliedField.bulkCreate(projectFieldArray, {
      individualHooks: true
    });

    if (!project || !projectWantedSkill || !projectAppliedField) {
      return next(new Error('Error to create tuple'));
    }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showProject = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No ProjectId'));
    }

    const project = await Models.Project.findOne({
      where: {
        id: projectId
      },
      attributes: [
        'id', 'projectName',
        'projectDescription',
        [
          Models.sequelize.fn('DATEDIFF',
            Models.sequelize.col('projectClosingDate'),
            Models.sequelize.col('projectOpeningDate')
          ), 'dDay'
        ],
        [
          Models.sequelize.fn('COUNT',
            Models.sequelize.col('Likes.id')
          ), 'isLike'
        ],
        [
          Models.sequelize.fn('COUNT',
            Models.sequelize.col('Applicants.id')
          ), 'isApplied'
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
          through: {
            where: {
              'likeUserId': myUserId
            }
          }
        },
        {
          model: Models.User,
          as: 'Applicants',
          attributes: [],
          through: {
            where: {
              'applicantId': myUserId
            }
          }
        },
        {
          model: Models.ProjectBackground,
          attributes: [ 'projectBackgroundImage' ]
        }
      ],
      group: [ 'id' ]
    });

    if (!project) {
      return next(new Error('Error to create tuple'));
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'project': project
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showCommentList = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    const comments = await Models.ProjectComment.findAll({
      where: {
        projectId: projectId
      },
      attributes: [
        'commentContents',
        [
          Models.sequelize.fn('DATEDIFF',
            new Date(), Models.sequelize.col('ProjectComment.createdAt')
          ), 'dateDiff'
        ],
        [
          Models.sequelize.fn('TIMEDIFF',
            new Date(), Models.sequelize.col('ProjectComment.createdAt')
          ), 'timeDiff'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'User',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        }
      ]
    });

    if (!comments) {
      return next(new Error('Error to create tuple'));
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'comments': comments
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.setProjectComment = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    const userId = req.headers.userid;
    if (!userId) {
      return next(new Error('No userId'));
    }

    const commentContents = req.body.commentContents;

    const comment = await Models.ProjectComment.create({
      projectId: projectId,
      userId: userId,
      commentContents: commentContents
    });

    const comments = await Models.ProjectComment.findAll({
      where: {
        projectId: projectId
      },
      attributes: [
        'commentContents',
        [
          Models.sequelize.fn('DATEDIFF',
            new Date(), Models.sequelize.col('ProjectComment.createdAt')
          ), 'dateDiff'
        ],
        [
          Models.sequelize.fn('TIMEDIFF',
            new Date(), Models.sequelize.col('ProjectComment.createdAt')
          ), 'timeDiff'
        ]
      ],
      include: [
        {
          model: Models.User,
          as: 'User',
          attributes: [ 'id', 'userNickname', 'userImage' ]
        }
      ]
    });

    if (!comments) {
      return next(new Error("Error to create tuple"));
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'comments': comments
      }
    });
  }
  catch (error) {
    console.log('Error: ' + error.message);
    next(error);
  }
};

exports.showProjectLikes = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No id'));
    }

    const users = await Models.Project.findAll({
      where: {
        id: projectId
      },
      attributes: [],
      include: [
        {
          model: Models.User,
          as: 'Likes',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          through: { attributes: [] }
        }
      ],
      limit: 5,
      subQuery: false
    });

    if (!users) {
      return next(new Error("Error to create tuple"));
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        users: users
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.setProjectLike = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    if (req.body.check == 'true') {
      const projectLike = await Models.ProjectLike.create({
        projectId: projectId,
        likeUserId: myUserId
      });
    } else if (req.body.check == 'false') {
      const projectLike = await Models.ProjectLike.destroy({
        where: {
          $and: [
            {
              projectId: projectId
            },
            {
              likeUserId: myUserId
            }
          ]
        }
      })
    } else {
      return next(new Error('Must true or false'))
    }

    // const project = await Models.Project.findOne({
    //   where: {
    //     id: projectId
    //   },
    //   attributes: [
    //     'id', 'projectName',
    //     'projectDescription',
    //     [
    //       Models.sequelize.fn('DATEDIFF',
    //         Models.sequelize.col('projectClosingDate'),
    //         Models.sequelize.col('projectOpeningDate')
    //       ), 'dDay'
    //     ],
    //     [
    //       Models.sequelize.fn('COUNT',
    //         Models.sequelize.col('Likes.id')
    //       ), 'isLike'
    //     ],
    //     [
    //       Models.sequelize.fn('COUNT',
    //         Models.sequelize.col('Applicants.id')
    //       ), 'isApplied'
    //     ]
    //   ],
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'Owner',
    //       attributes: [ 'id', 'userNickname', 'userImage' ]
    //     },
    //     {
    //       model: Models.User,
    //       as: 'Likes',
    //       attributes: [],
    //       through: {
    //         where: {
    //           'likeUserId': myUserId
    //         }
    //       }
    //     },
    //     {
    //       model: Models.User,
    //       as: 'Applicants',
    //       attributes: [],
    //       through: {
    //         where: {
    //           'applicantId': myUserId
    //         }
    //       }
    //     },
    //     {
    //       model: Models.ProjectBackground,
    //       attributes: [ 'projectBackgroundImage' ]
    //     }
    //   ],
    //   group: [ 'id' ]
    // });
    //
    // if (!project) {
    //   return next(new Error('Error to create tuple'));
    // }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.setProjectListLike = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    if (req.body.check == 'true') {
      const projectLike = await Models.ProjectLike.create({
        projectId: projectId,
        likeUserId: myUserId
      });
    } else if (req.body.check == 'false') {
      const projectLike = await Models.ProjectLike.destroy({
        where: {
          $and: [
            {
              projectId: projectId
            },
            {
              likeUserId: myUserId
            }
          ]
        }
      })
    } else {
      return next(new Error('Must true or false'))
    }

    // const projects = await Models.Project.findAll({
    //   where: {
    //     'ownerId': {
    //       $not: myUserId
    //     }
    //   },
    //   attributes: [
    //     'id', 'projectName',
    //     [
    //       Models.sequelize.fn('DATEDIFF',
    //         Models.sequelize.col('projectClosingDate'),
    //         Models.sequelize.col('projectOpeningDate')
    //       ), 'dDay'
    //     ],
    //     [
    //       Models.sequelize.fn('COUNT',
    //         Models.sequelize.col('Likes.id')
    //       ), 'isLike'
    //     ]
    //   ],
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'Owner',
    //       attributes: [ 'id', 'userNickname', 'userImage' ]
    //     },
    //     {
    //       model: Models.User,
    //       as: 'Likes',
    //       attributes: [],
    //       through: {
    //         where: {
    //           'likeUserid': myUserId
    //         }
    //       }
    //     },
    //     {
    //       model: Models.ProjectBackground,
    //       attributes: [ 'projectBackgroundImage' ]
    //     }
    //   ],
    //   group: [ 'id' ]
    // });
    //
    // if (!projects) {
    //   return next(new Error('Error to create tuple'));
    // }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showProjectFields = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    const fields = await Models.Project.findAll({
      where: {
        id: projectId
      },
      attributes: [],
      include: [
        {
          model: Models.Skill,
          attributes: [ 'skillName' ],
          through: { attributes: [] }
        },
        {
          model: Models.ProjectField,
          attributes: [ 'projectFieldName' ],
          through: { attributes: [] }
        }
      ]
    });

    if (!fields) {
      return next(new Error("Error to create tuple"));
    }

    return res.status(201).json({
      'msg': 'success',
      'data': {
        'fields': fields
      }
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.applyProject = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    if (req.body.check == 'true') {
      const projectApply = await Models.ProjectApply.create({
        projectId: projectId,
        applicantId: myUserId
      });
    } else if (req.body.check == 'false') {
      const projectApply = await Models.ProjectApply.destroy({
        where: {
          $and: [
            {
              projectId: projectId
            },
            {
              applicantId: myUserId
            }
          ]
        }
      })
    } else {
      return next(new Error('Must true or false'))
    }

    // const project = await Models.Project.findOne({
    //   where: {
    //     id: projectId
    //   },
    //   attributes: [
    //     'id', 'projectName',
    //     'projectDescription',
    //     [
    //       Models.sequelize.fn('DATEDIFF',
    //         Models.sequelize.col('projectClosingDate'),
    //         Models.sequelize.col('projectOpeningDate')
    //       ), 'dDay'
    //     ],
    //     [
    //       Models.sequelize.fn('COUNT',
    //         Models.sequelize.col('Likes.id')
    //       ), 'isLike'
    //     ],
    //     [
    //       Models.sequelize.fn('COUNT',
    //         Models.sequelize.col('Applicants.id')
    //       ), 'isApplied'
    //     ]
    //   ],
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'Owner',
    //       attributes: [ 'id', 'userNickname', 'userImage' ]
    //     },
    //     {
    //       model: Models.User,
    //       as: 'Likes',
    //       attributes: [],
    //       through: {
    //         where: {
    //           'likeUserId': myUserId
    //         }
    //       }
    //     },
    //     {
    //       model: Models.User,
    //       as: 'Applicants',
    //       attributes: [],
    //       through: {
    //         where: {
    //           'applicantId': myUserId
    //         }
    //       }
    //     },
    //     {
    //       model: Models.ProjectBackground,
    //       attributes: [ 'projectBackgroundImage' ]
    //     }
    //   ],
    //   group: [ 'id' ]
    // });
    //
    // if (!project) {
    //   return next(new Error('Error to create tuple'));
    // }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.showRecruitMember = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    const users = await Models.Project.findAll({
      where: {
        id: projectId
      },
      attributes: [ 'projectMemberNumber' ],
      include: [
        {
          model: Models.User,
          as: 'Applicants',
          attributes: [ 'id', 'userNickname', 'userImage' ],
          through: { attributes: [] }
        }
      ]
    });

    if (!users) {
      return next(new Error("Error to create tuple"));
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

exports.setRecruitProject = async (req, res, next) => {
  try {
    // User Authorization
    const myUserId = parseInt(req.headers.userid, 10);
    if (!myUserId) {
      return next(new Error('No myUserId'));
    }

    const projectId = parseInt(req.params.projectId, 10);
    if (!projectId) {
      return next(new Error('No projectId'));
    }

    const recruitUserIds = JSON.parse(req.body.recruitUserIds);

    const recruitUserArray = [];
    for (let recruitUserId of recruitUserIds) {
      recruitUserArray.push({
        projectId: projectId,
        runnerId: recruitUserId
      });
    }

    const projectRunner = await Models.ProjectRunner.bulkCreate(recruitUserArray, {
      individualHooks: true
    });

    const project = await Models.Project.update(
      {
        projectState: '진행'
      },
      {
        where: {
          id: projectId
        }
      }
    );

    if (!project || !projectRunner) {
      return next(new Error("Error to create tuple"));
    }

    return res.status(201).json({
      'msg': 'success'
    });
  }
  catch (error) {
    return next(error);
  }
};
