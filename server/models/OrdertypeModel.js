import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
  
const Ordertype = db.define('ordertype',{  ordertypename: { type: DataTypes.STRING, allowNull: false },
  minapprovercnt: { type: DataTypes.INTEGER, allowNull: false },
  activestatus: { type: DataTypes.INTEGER, allowNull: false },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  lastupdatedBy: { type: DataTypes.STRING, allowNull: false },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Ordertype; 

