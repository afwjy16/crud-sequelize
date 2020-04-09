'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [
          {
            name : "Coba",
            email : "coba@gmail.com",
            phone_number : "081273663077",
            gender : 'Laki-laki',
            createdAt : new Date(),
            updatedAt : new Date()
          },
          {
            name : "Ica",
            email : "ica@gmail.com",
            phone_number : "08971600071",
            gender : 'Perempuan',
            createdAt : new Date(),
            updatedAt : new Date()
          },
        ], 
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
