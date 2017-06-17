const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Identities', [
      { id: 1, identityName: 'hard working' },
      { id: 2, identityName: 'bring idea' },
      { id: 3, identityName: 'problemsolver' },
      { id: 4, identityName: 'quick learner' },
      { id: 5, identityName: 'free mind' },
      { id: 6, identityName: 'brain' },
      { id: 7, identityName: 'nerd' },
      { id: 8, identityName: 'moderator' },
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
