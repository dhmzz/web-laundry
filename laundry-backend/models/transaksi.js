'use strict';
const {
  Model
} = require('sequelize');
const detail_transaksi = require('./detail_transaksi');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi,{
        foreignKey : "id_transaksi",
        as : "detail_transaksi"
      }),
      this.belongsTo(models.user,{
        foreignKey : "id_user",
        as : "user"
      }),
      this.belongsTo(models.member,{
        foreignKey : "id_member",
        as : "member"
      })
    }
  }
  transaksi.init({
    id_transaksi: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    id_member: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    id_user: DataTypes.INTEGER,   
    status:{
      type: DataTypes.ENUM("Recent", "Proccess","Done"),
      defaultValue: "Recent",
    },
    status_bayar: {
      type: DataTypes.ENUM("Paid", "Unpaid"),
      defaultValue: "Unpaid",
    },
  },
  {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi',
  });
  return transaksi;
};