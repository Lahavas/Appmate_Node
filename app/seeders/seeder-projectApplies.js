
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('ProjectApplies', [
      { id: 1, projectId: 1, applicantId: 30, createdAt: new Date(), updatedAt: new Date()},
      { id: 2, projectId: 1, applicantId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 3, projectId: 1, applicantId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 4, projectId: 2, applicantId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 5, projectId: 2, applicantId: 24, createdAt: new Date(), updatedAt: new Date()},
      { id: 6, projectId: 3, applicantId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 7, projectId: 3, applicantId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 8, projectId: 3, applicantId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 9, projectId: 3, applicantId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 10, projectId: 3, applicantId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 11, projectId: 3, applicantId: 5, createdAt: new Date(), updatedAt: new Date()},
      { id: 12, projectId: 3, applicantId: 6, createdAt: new Date(), updatedAt: new Date()},
      { id: 13, projectId: 3, applicantId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 14, projectId: 3, applicantId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 15, projectId: 3, applicantId: 9, createdAt: new Date(), updatedAt: new Date()},
      { id: 16, projectId: 3, applicantId: 10, createdAt: new Date(), updatedAt: new Date()},
      { id: 17, projectId: 3, applicantId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 18, projectId: 4, applicantId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 19, projectId: 4, applicantId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 20, projectId: 4, applicantId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 21, projectId: 5, applicantId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 22, projectId: 5, applicantId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 23, projectId: 7, applicantId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 24, projectId: 8, applicantId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 25, projectId: 8, applicantId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 26, projectId: 9, applicantId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 27, projectId: 9, applicantId: 16, createdAt: new Date(), updatedAt: new Date()},
      { id: 28, projectId: 9, applicantId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 29, projectId: 9, applicantId: 23, createdAt: new Date(), updatedAt: new Date()},
      { id: 30, projectId: 9, applicantId: 24, createdAt: new Date(), updatedAt: new Date()},
      { id: 31, projectId: 10, applicantId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 32, projectId: 10, applicantId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 33, projectId: 11, applicantId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 34, projectId: 12, applicantId: 34, createdAt: new Date(), updatedAt: new Date()},
      { id: 35, projectId: 14, applicantId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 36, projectId: 14, applicantId: 37, createdAt: new Date(), updatedAt: new Date()},
      { id: 37, projectId: 15, applicantId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 38, projectId: 16, applicantId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 39, projectId: 16, applicantId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 40, projectId: 16, applicantId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 41, projectId: 18, applicantId: 4, createdAt: new Date(), updatedAt: new Date()}
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
