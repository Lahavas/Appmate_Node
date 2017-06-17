const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Skills', [
      { id: 1, skillName: 'IOS', skillField: '개발' },
      { id: 2, skillName: 'SWIFT', skillField: '개발' },
      { id: 3, skillName: 'ANDROID', skillField: '개발' },
      { id: 4, skillName: 'C', skillField: '개발' },
      { id: 5, skillName: 'CSHARP', skillField: '개발' },
      { id: 6, skillName: 'OBJECTIVEC', skillField: '개발' },
      { id: 7, skillName: 'JAVA', skillField: '개발' },
      { id: 8, skillName: 'PYTHON', skillField: '개발' },
      { id: 9, skillName: 'RUBY', skillField: '개발' },
      { id: 10, skillName: 'CSS', skillField: '개발' },
      { id: 11, skillName: 'PHP', skillField: '개발' },
      { id: 12, skillName: 'JS', skillField: '개발' },
      { id: 13, skillName: 'QA', skillField: '개발' },
      { id: 14, skillName: 'HTML', skillField: '개발' },
      { id: 15, skillName: 'DJANGO', skillField: '개발' },
      { id: 16, skillName: 'JAVASCRIPT', skillField: '개발' },
      { id: 17, skillName: 'JQUERY', skillField: '개발' },
      { id: 18, skillName: 'ANGULAR', skillField: '개발' },
      { id: 19, skillName: 'DP', skillField: '개발' },
      { id: 20, skillName: 'SYSTEME', skillField: '개발' },
      { id: 21, skillName: 'PP', skillField: '기획' },
      { id: 22, skillName: 'CP', skillField: '기획' },
      { id: 23, skillName: 'BP', skillField: '기획' },
      { id: 24, skillName: 'SP', skillField: '기획' },
      { id: 25, skillName: 'OP', skillField: '기획' },
      { id: 26, skillName: 'BS', skillField: '마케팅' },
      { id: 27, skillName: 'MM', skillField: '마케팅' },
      { id: 28, skillName: 'SM', skillField: '마케팅' },
      { id: 29, skillName: 'AM', skillField: '마케팅' },
      { id: 30, skillName: 'DA', skillField: '마케팅' },
      { id: 31, skillName: 'PR', skillField: '마케팅' },
      { id: 32, skillName: 'IR', skillField: '마케팅' },
      { id: 33, skillName: 'UID', skillField: '디자인' },
      { id: 34, skillName: 'UXD', skillField: '디자인' },
      { id: 35, skillName: 'ID', skillField: '디자인' },
      { id: 36, skillName: 'GAMED', skillField: '디자인' },
      { id: 37, skillName: 'GRAPHICD', skillField: '디자인' },
      { id: 38, skillName: 'WEBD', skillField: '디자인' },
      { id: 39, skillName: 'MOBILEDE', skillField: '디자인' },
      { id: 40, skillName: 'SALES', skillField: '매니지먼트' },
      { id: 41, skillName: 'RECRUI', skillField: '매니지먼트' },
      { id: 42, skillName: 'PM', skillField: '매니지먼트' },
      { id: 43, skillName: 'CEO', skillField: '매니지먼트' },
      { id: 44, skillName: 'CFO', skillField: '매니지먼트' },
      { id: 45, skillName: 'VP', skillField: '매니지먼트' },
      { id: 46, skillName: 'CTO', skillField: '매니지먼트' },
      { id: 47, skillName: 'COO', skillField: '매니지먼트' },
      { id: 48, skillName: 'HR', skillField: '매니지먼트' },
      { id: 49, skillName: 'CMO', skillField: '매니지먼트' }
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
