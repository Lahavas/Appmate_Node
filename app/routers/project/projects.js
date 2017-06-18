const express = require('express');
const router = express.Router();

const controller = require('./project.controller');

router.route('/')
  .get(controller.showProjectList);
  //.post(controller.setProject);

// router.route('/temp')
//   .post(controller.setTempProject);
//
router.route('/:projectId')
  .get(controller.showProject);
//   .post(controller.updateProject);
//
// router.route('/:projectId/state')
//   .put(controller.updateProjectState);
//
// router.route('/:projectId/applicants')
//   .get(controller.showProjectApplicants);
//
router.route('/:projectId/likes')
  .get(controller.showProjectLikes)
  .post(controller.setProjectLike);

router.route('/:projectId/listlikes')
  .post(controller.setProjectListLike);

router.route('/:projectId/fields')
  .get(controller.showProjectFields);
//
// router.route('/:projectId/apply')
//   .post(controller.applyProject);
//
// router.route('/:projectId/recruit')
//   .post(controller.recruitProject);
//
router.route('/:projectId/comment')
  .get(controller.showCommentList)
  .post(controller.setProjectComment);

// router.route('/:projectId/comment/:commentId')
//   .post(controller.updateProjectComment)
//   .delete(controller.deleteProjectComment);

module.exports = router;
