'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [{
      reply: 'wah cantik bener',
      commentLike: 5,
      commentDislike: 3,
      UserId: 2,
      PostId: 1
    }, {
      reply: 'gokil abis nih samurai',
      commentLike: 5,
      commentDislike: 3,
      UserId: 2,
      PostId: 2
    }, {
      reply: 'ke enakan si bocilnya itu',
      commentLike: 33,
      commentDislike: 271,
      UserId: 3,
      PostId: 3
    }, {
      reply: 'kasian bet itu tony stark',
      commentLike: 65,
      commentDislike: 25,
      UserId: 1,
      PostId: 4
    }, 
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
