const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('ProjectBackgrounds', [
      { id: 1, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_01.jpeg' },
      { id: 2, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_02.jpeg' },
      { id: 3, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_03.jpeg' },
      { id: 4, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_04.jpeg' },
      { id: 5, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_05.jpeg' },
      { id: 6, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_06.jpeg' },
      { id: 7, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_07.jpeg' },
      { id: 8, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_08.jpeg' },
      { id: 9, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_09.jpeg' },
      { id: 10, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_10.jpeg' },
      { id: 11, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_11.jpeg' },
      { id: 12, projectBackgroundImage: 'https://s3.ap-northeast-2.amazonaws.com/appmate2017/projectbg/project_background_12.jpeg' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
