const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest:'uploads/' });

const controller = require('./user.controller');

router.route('/login')
  .post(upload.single('userImage'), controller.login);

router.route('/profile')
  .get(controller.showMyProfile)
//   .post(controller.updateMyProfile);

router.route('/project')
  .get(controller.showMyProject)

// router.route('/badges')
//   .get(controller.showMybadges);
//
// router.route('/followings')
//   .get(controller.showMyFollowings);
//
// router.route('/followers')
//   .get(controller.showMyFollowers);
//
// router.route('/highfives')
//   .get(controller.showMyHighfiveUsers);
//
// router.route('/corpAuth')
//   .post(controller.authCorporation);
//
// router.route('/pass')
//   .post(controller.savePass);

router.route('/profile/:userId')
  .get(controller.showOtherProfile);

// router.route('/following/:userId')
//   .post(controller.setFollowing);

router.route('/badges/:userId')
  .get(controller.showOtherBadges);

// router.route('/highfive/:userId')
//   .post(controller.setHighfive);

router.route('/userList')
  .get(controller.showUserList);

module.exports = router;
