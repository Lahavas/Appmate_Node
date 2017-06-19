const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest:'uploads/' });

const controller = require('./user.controller');

// router.route('/login')
//   .post(upload.single('userImage'), controller.login);

router.route('/profile')
  .get(controller.showMyProfile)
//   .post(controller.updateMyProfile);

router.route('/project')
  .get(controller.showMyProject)

// router.route('/badges')
//   .get(controller.showMybadges);

router.route('/followings')
  .get(controller.showMyFollowings);

router.route('/followers')
  .get(controller.showMyFollowers);

// router.route('/corpAuth')
//   .post(controller.authCorporation);
//
// router.route('/pass')
//   .post(controller.savePass);

router.route('/profile/:userId')
  .get(controller.showOtherProfile);

router.route('/project/:userId')
  .get(controller.showOtherProject)

router.route('/following/:userId')
  .post(controller.setFollowing);

// router.route('/badges/:userId')
//   .get(controller.showOtherBadges);

router.route('/followings/:userId')
  .get(controller.showOtherFollowings);

router.route('/followers/:userId')
  .get(controller.showOtherFollowers);

// router.route('/highfive/:userId')
//   .post(controller.setHighfive);

router.route('/userList')
  .get(controller.showUserList);

router.route('/userMapList')
  .get(controller.showUserMapList)
  .post(controller.showUserMapListWithPoint);

module.exports = router;
