'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_member: {
        type: Sequelize.INTEGER,
        references: {model : 'member', key : "id_member"}
      },
      tgl: {
        type: Sequelize.DATE
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {model : 'user', key : "id_user"}
      },
      status: {
        type: Sequelize.ENUM("Recent", "Proccess","Done"),
        defaultValue: "Recent",
      },
      status_bayar: {
        type: Sequelize.ENUM("Paid","Unpaid"),
        defaultValue: "Unpaid",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};