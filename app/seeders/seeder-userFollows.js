
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('UserFollows', [
      { id: 1, followingId: 1, followerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 2, followingId: 1, followerId: 5, createdAt: new Date(), updatedAt: new Date()},
      { id: 3, followingId: 1, followerId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 4, followingId: 1, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 5, followingId: 1, followerId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 6, followingId: 1, followerId: 18, createdAt: new Date(), updatedAt: new Date()},
      { id: 7, followingId: 1, followerId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 8, followingId: 1, followerId: 27, createdAt: new Date(), updatedAt: new Date()},
      { id: 9, followingId: 1, followerId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 10, followingId: 1, followerId: 37, createdAt: new Date(), updatedAt: new Date()},
      { id: 11, followingId: 2, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 12, followingId: 2, followerId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 13, followingId: 2, followerId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 14, followingId: 2, followerId: 41, createdAt: new Date(), updatedAt: new Date()},
      { id: 15, followingId: 2, followerId: 44, createdAt: new Date(), updatedAt: new Date()},
      { id: 16, followingId: 3, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 17, followingId: 3, followerId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 18, followingId: 3, followerId: 5, createdAt: new Date(), updatedAt: new Date()},
      { id: 19, followingId: 3, followerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 20, followingId: 3, followerId: 9, createdAt: new Date(), updatedAt: new Date()},
      { id: 21, followingId: 3, followerId: 10, createdAt: new Date(), updatedAt: new Date()},
      { id: 22, followingId: 3, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 23, followingId: 3, followerId: 17, createdAt: new Date(), updatedAt: new Date()},
      { id: 24, followingId: 4, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 25, followingId: 4, followerId: 10, createdAt: new Date(), updatedAt: new Date()},
      { id: 26, followingId: 6, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 27, followingId: 6, followerId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 28, followingId: 6, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 29, followingId: 7, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 30, followingId: 8, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 31, followingId: 9, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 32, followingId: 9, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 33, followingId: 9, followerId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 34, followingId: 9, followerId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 35, followingId: 10, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 36, followingId: 10, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 37, followingId: 10, followerId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 38, followingId: 11, followerId: 10, createdAt: new Date(), updatedAt: new Date()},
      { id: 39, followingId: 11, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 40, followingId: 11, followerId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 41, followingId: 11, followerId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 42, followingId: 11, followerId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 43, followingId: 11, followerId: 16, createdAt: new Date(), updatedAt: new Date()},
      { id: 44, followingId: 11, followerId: 17, createdAt: new Date(), updatedAt: new Date()},
      { id: 45, followingId: 11, followerId: 18, createdAt: new Date(), updatedAt: new Date()},
      { id: 46, followingId: 11, followerId: 19, createdAt: new Date(), updatedAt: new Date()},
      { id: 47, followingId: 11, followerId: 20, createdAt: new Date(), updatedAt: new Date()},
      { id: 48, followingId: 11, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 49, followingId: 11, followerId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 50, followingId: 11, followerId: 41, createdAt: new Date(), updatedAt: new Date()},
      { id: 51, followingId: 11, followerId: 47, createdAt: new Date(), updatedAt: new Date()},
      { id: 52, followingId: 12, followerId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 53, followingId: 12, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 54, followingId: 12, followerId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 55, followingId: 13, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 56, followingId: 13, followerId: 16, createdAt: new Date(), updatedAt: new Date()},
      { id: 57, followingId: 14, followerId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 58, followingId: 14, followerId: 34, createdAt: new Date(), updatedAt: new Date()},
      { id: 59, followingId: 14, followerId: 35, createdAt: new Date(), updatedAt: new Date()},
      { id: 60, followingId: 14, followerId: 36, createdAt: new Date(), updatedAt: new Date()},
      { id: 61, followingId: 14, followerId: 37, createdAt: new Date(), updatedAt: new Date()},
      { id: 62, followingId: 14, followerId: 38, createdAt: new Date(), updatedAt: new Date()},
      { id: 63, followingId: 14, followerId: 39, createdAt: new Date(), updatedAt: new Date()},
      { id: 64, followingId: 14, followerId: 40, createdAt: new Date(), updatedAt: new Date()},
      { id: 65, followingId: 14, followerId: 41, createdAt: new Date(), updatedAt: new Date()},
      { id: 66, followingId: 15, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 67, followingId: 15, followerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 68, followingId: 15, followerId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 69, followingId: 16, followerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 70, followingId: 16, followerId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 71, followingId: 17, followerId: 6, createdAt: new Date(), updatedAt: new Date()},
      { id: 72, followingId: 18, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 73, followingId: 18, followerId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 74, followingId: 18, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 75, followingId: 19, followerId: 3, createdAt: new Date(), updatedAt: new Date()},
      { id: 76, followingId: 19, followerId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 77, followingId: 19, followerId: 5, createdAt: new Date(), updatedAt: new Date()},
      { id: 78, followingId: 19, followerId: 6, createdAt: new Date(), updatedAt: new Date()},
      { id: 79, followingId: 19, followerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 80, followingId: 19, followerId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 81, followingId: 21, followerId: 10, createdAt: new Date(), updatedAt: new Date()},
      { id: 82, followingId: 21, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 83, followingId: 22, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 84, followingId: 23, followerId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 85, followingId: 23, followerId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 86, followingId: 23, followerId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 87, followingId: 23, followerId: 34, createdAt: new Date(), updatedAt: new Date()},
      { id: 88, followingId: 23, followerId: 35, createdAt: new Date(), updatedAt: new Date()},
      { id: 89, followingId: 23, followerId: 36, createdAt: new Date(), updatedAt: new Date()},
      { id: 90, followingId: 23, followerId: 37, createdAt: new Date(), updatedAt: new Date()},
      { id: 91, followingId: 24, followerId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 92, followingId: 24, followerId: 25, createdAt: new Date(), updatedAt: new Date()},
      { id: 93, followingId: 24, followerId: 26, createdAt: new Date(), updatedAt: new Date()},
      { id: 94, followingId: 25, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 95, followingId: 25, followerId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 96, followingId: 26, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 97, followingId: 27, followerId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 98, followingId: 29, followerId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 99, followingId: 29, followerId: 35, createdAt: new Date(), updatedAt: new Date()},
      { id: 100, followingId: 30, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 101, followingId: 30, followerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 102, followingId: 32, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 103, followingId: 32, followerId: 5, createdAt: new Date(), updatedAt: new Date()},
      { id: 104, followingId: 32, followerId: 7, createdAt: new Date(), updatedAt: new Date()},
      { id: 105, followingId: 32, followerId: 8, createdAt: new Date(), updatedAt: new Date()},
      { id: 106, followingId: 32, followerId: 9, createdAt: new Date(), updatedAt: new Date()},
      { id: 107, followingId: 32, followerId: 11, createdAt: new Date(), updatedAt: new Date()},
      { id: 108, followingId: 32, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 109, followingId: 32, followerId: 14, createdAt: new Date(), updatedAt: new Date()},
      { id: 110, followingId: 32, followerId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 111, followingId: 32, followerId: 17, createdAt: new Date(), updatedAt: new Date()},
      { id: 112, followingId: 32, followerId: 18, createdAt: new Date(), updatedAt: new Date()},
      { id: 113, followingId: 32, followerId: 29, createdAt: new Date(), updatedAt: new Date()},
      { id: 114, followingId: 32, followerId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 115, followingId: 33, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 116, followingId: 33, followerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 117, followingId: 33, followerId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 118, followingId: 34, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 119, followingId: 34, followerId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 120, followingId: 35, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 121, followingId: 36, followerId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 122, followingId: 38, followerId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 123, followingId: 40, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 124, followingId: 40, followerId: 15, createdAt: new Date(), updatedAt: new Date()},
      { id: 125, followingId: 41, followerId: 1, createdAt: new Date(), updatedAt: new Date()},
      { id: 126, followingId: 41, followerId: 2, createdAt: new Date(), updatedAt: new Date()},
      { id: 127, followingId: 41, followerId: 4, createdAt: new Date(), updatedAt: new Date()},
      { id: 128, followingId: 42, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 129, followingId: 42, followerId: 22, createdAt: new Date(), updatedAt: new Date()},
      { id: 130, followingId: 43, followerId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 131, followingId: 43, followerId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 132, followingId: 43, followerId: 34, createdAt: new Date(), updatedAt: new Date()},
      { id: 133, followingId: 43, followerId: 35, createdAt: new Date(), updatedAt: new Date()},
      { id: 134, followingId: 44, followerId: 12, createdAt: new Date(), updatedAt: new Date()},
      { id: 135, followingId: 45, followerId: 13, createdAt: new Date(), updatedAt: new Date()},
      { id: 136, followingId: 46, followerId: 16, createdAt: new Date(), updatedAt: new Date()},
      { id: 137, followingId: 47, followerId: 21, createdAt: new Date(), updatedAt: new Date()},
      { id: 138, followingId: 48, followerId: 31, createdAt: new Date(), updatedAt: new Date()},
      { id: 139, followingId: 48, followerId: 32, createdAt: new Date(), updatedAt: new Date()},
      { id: 140, followingId: 48, followerId: 33, createdAt: new Date(), updatedAt: new Date()},
      { id: 141, followingId: 48, followerId: 34, createdAt: new Date(), updatedAt: new Date()},
      { id: 142, followingId: 48, followerId: 35, createdAt: new Date(), updatedAt: new Date()}

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
