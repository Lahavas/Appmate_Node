
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('ProjectRunners', [
      { id: 1, projectId: 21, runnerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 2, projectId: 21, runnerId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 3, projectId: 21, runnerId: 9, createdAt: new Date(), updatedAt: new Date()},
      { id: 4, projectId: 21, runnerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 5, projectId: 21, runnerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 6, projectId: 22, runnerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 7, projectId: 22, runnerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 8, projectId: 22, runnerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 9, projectId: 22, runnerId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 10, projectId: 24, runnerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 11, projectId: 24, runnerId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 12, projectId: 24, runnerId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 13, projectId: 24, runnerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 14, projectId: 24, runnerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 15, projectId: 25, runnerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 16, projectId: 25, runnerId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 17, projectId: 25, runnerId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 18, projectId: 27, runnerId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 19, projectId: 27, runnerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 20, projectId: 27, runnerId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 21, projectId: 27, runnerId: 23, createdAt: new Date(), updatedAt: new Date()},
      { id: 22, projectId: 28, runnerId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 23, projectId: 28, runnerId: 23, createdAt: new Date(), updatedAt: new Date()},
      { id: 24, projectId: 28, runnerId: 24, createdAt: new Date(), updatedAt: new Date()}
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
