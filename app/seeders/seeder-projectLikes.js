
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('ProjectLikes', [
      { id: 1, projectId: 1, likeUserId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 2, projectId: 1, likeUserId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 3, projectId: 1, likeUserId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 4, projectId: 1, likeUserId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 5, projectId: 1, likeUserId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 6, projectId: 2, likeUserId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 7, projectId: 2, likeUserId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 8, projectId: 2, likeUserId: 17, createdAt: new Date(), updatedAt: new Date()},
      { id: 9, projectId: 2, likeUserId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 10, projectId: 2, likeUserId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 16, projectId: 3, likeUserId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 17, projectId: 3, likeUserId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 18, projectId: 3, likeUserId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 19, projectId: 3, likeUserId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 20, projectId: 4, likeUserId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 21, projectId: 4, likeUserId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 22, projectId: 4, likeUserId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 23, projectId: 4, likeUserId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 24, projectId: 4, likeUserId: 16, createdAt: new Date(), updatedAt: new Date()},
      { id: 25, projectId: 5, likeUserId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 26, projectId: 5, likeUserId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 27, projectId: 5, likeUserId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 28, projectId: 6, likeUserId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 29, projectId: 7, likeUserId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 30, projectId: 7, likeUserId: 41, createdAt: new Date(), updatedAt: new Date()},
      { id: 31, projectId: 7, likeUserId: 42, createdAt: new Date(), updatedAt: new Date()},
      { id: 32, projectId: 7, likeUserId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 36, projectId: 8, likeUserId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 37, projectId: 8, likeUserId: 16, createdAt: new Date(), updatedAt: new Date()},
      { id: 38, projectId: 8, likeUserId: 17, createdAt: new Date(), updatedAt: new Date()},
      { id: 39, projectId: 8, likeUserId: 18, createdAt: new Date(), updatedAt: new Date()},
      { id: 40, projectId: 8, likeUserId: 19, createdAt: new Date(), updatedAt: new Date()},
      { id: 41, projectId: 9, likeUserId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 42, projectId: 9, likeUserId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 43, projectId: 9, likeUserId: 6, createdAt: new Date(), updatedAt: new Date()},
      { id: 44, projectId: 9, likeUserId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 45, projectId: 9, likeUserId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 46, projectId: 9, likeUserId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 47, projectId: 10, likeUserId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 48, projectId: 10, likeUserId: 24, createdAt: new Date(), updatedAt: new Date()},
      { id: 49, projectId: 10, likeUserId: 25, createdAt: new Date(), updatedAt: new Date()},
      { id: 50, projectId: 11, likeUserId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 51, projectId: 11, likeUserId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 52, projectId: 12, likeUserId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 53, projectId: 12, likeUserId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 54, projectId: 12, likeUserId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 55, projectId: 12, likeUserId: 34, createdAt: new Date(), updatedAt: new Date()},
      { id: 56, projectId: 13, likeUserId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 57, projectId: 14, likeUserId: 38, createdAt: new Date(), updatedAt: new Date()},
      { id: 58, projectId: 14, likeUserId: 41, createdAt: new Date(), updatedAt: new Date()},
      { id: 59, projectId: 14, likeUserId: 42, createdAt: new Date(), updatedAt: new Date()},
      { id: 60, projectId: 14, likeUserId: 43, createdAt: new Date(), updatedAt: new Date()},
      { id: 61, projectId: 14, likeUserId: 44, createdAt: new Date(), updatedAt: new Date()},
      { id: 62, projectId: 14, likeUserId: 45, createdAt: new Date(), updatedAt: new Date()},
      { id: 63, projectId: 14, likeUserId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 64, projectId: 15, likeUserId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 65, projectId: 15, likeUserId: 23, createdAt: new Date(), updatedAt: new Date()},
      { id: 66, projectId: 15, likeUserId: 24, createdAt: new Date(), updatedAt: new Date()},
      { id: 67, projectId: 17, likeUserId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 68, projectId: 17, likeUserId: 17, createdAt: new Date(), updatedAt: new Date()},
      { id: 69, projectId: 19, likeUserId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 70, projectId: 20, likeUserId: 49, createdAt: new Date(), updatedAt: new Date()},
      { id: 71, projectId: 8, likeUserId: 30, createdAt: new Date(), updatedAt: new Date()},
      { id: 72, projectId: 9, likeUserId: 30, createdAt: new Date(), updatedAt: new Date()},
      { id: 73, projectId: 10, likeUserId: 30, createdAt: new Date(), updatedAt: new Date()},
      { id: 74, projectId: 11, likeUserId: 30, createdAt: new Date(), updatedAt: new Date()},
      { id: 75, projectId: 12, likeUserId: 30, createdAt: new Date(), updatedAt: new Date()},
      { id: 76, projectId: 13, likeUserId: 30, createdAt: new Date(), updatedAt: new Date()}
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
