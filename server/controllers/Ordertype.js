import db from "../config/Database.js";
import Ordertype from "../models/OrdertypeModel.js"; 

export const addOrdertype  = async (req, res) => {
   const { 
      id,       ordertypename,
      minapprovercnt,
      activestatus,
      createdBy,
      lastupdatedBy,
    } = req.body;

    try {
        const newOrdertype = await Ordertype.create(
{  
             ordertypename:  ordertypename, 
            minapprovercnt:  minapprovercnt, 
            activestatus:  activestatus, 
            createdBy:  createdBy, 
            lastupdatedBy:  lastupdatedBy, 
        } );
        res.json({ id: newOrdertype.id, msg: "Record creation successful", msgcode: "0", msgtype: "success" });
    } catch (error) {
        res.json({ id: null, msg: error.message + " while inserting record", msgcode: "1", msgtype: "error" });
        console.log(error);
    }
}
 
export const updateOrdertype = async (req, res) => {
   const { 
      id,       ordertypename,
      minapprovercnt,
      activestatus,
      createdBy,
      lastupdatedBy,
    } = req.body;

    try {
        const ordertype  = await Ordertype.update(
{  
             ordertypename:  ordertypename, 
            minapprovercnt:  minapprovercnt, 
            activestatus:  activestatus, 
            createdBy:  createdBy, 
            lastupdatedBy:  lastupdatedBy, 
        } , {
            where: { id: req.params.id }
        })
        res.json({ id: req.params.id, msg: "Record updated successfully", msgcode: "0", msgtype: "success" });
    } catch (error) {
      res.json({ id: req.params.id, msg: error.message + " while updating record id " + req.params.id, msgcode: "1", msgtype: "error" });
    }
}
 
 
export const deleteOrdertype = async (req, res) => {
    try {
        await Ordertype.destroy({
            where: { id: req.params.id }
        });
        res.json({ msg: "Record deletion successful", msgcode: "0", msgtype: "success" });
    } catch (error) {
        res.json({ id: req.params.id , msg: error.message + " while deleting record id" + req.params.id, msgcode: "1", msgtype: "error" });
        console.log(error);
    }
}

export const qryOrdertype = async (req, res) => {
   const { 
      id,       ordertypename,
      minapprovercnt,
      activestatus,
      createdBy,
      lastupdatedBy,
    } = req.query;

    try {
        const ordertype = await db.query(
            'SELECT id '
 +',ordertypename '
 +',minapprovercnt '
 +',activestatus '
 +',createdBy '
 +',lastupdatedBy '
  +'FROM Ordertype '
  +'WHERE 1=1 ' 
  +'and   COALESCE(ordertypename,0) like :ordertypename '
  +'and   COALESCE(minapprovercnt,0) like :minapprovercnt '
  +'and   COALESCE(activestatus,0) like :activestatus '
  +'and   COALESCE(createdBy,0) like :createdBy '
  +'and   COALESCE(lastupdatedBy,0) like :lastupdatedBy '
,            {
                replacements: {
                    ordertypename: `%${ordertypename}%`,
                    minapprovercnt: `%${minapprovercnt}%`,
                    activestatus: `%${activestatus}%`,
                    createdBy: `%${createdBy}%`,
                    lastupdatedBy: `%${lastupdatedBy}%`,
                },
                type: db.QueryTypes.SELECT,
            }
        );
        res.json(ordertype);
    } catch (error) {
        console.log(error);
    }
} 
 
export const lovOrdertype = async (req, res) => {
    try {
        const ordertype = await Ordertype.findAll({
            attributes: ['id', 'ordertypecd', 'ordertypename', 'minapprovercnt']
        });
        res.json(ordertype);
    } catch (error) {
        console.log(error);
    }
}

export const Ordertypename = async (req, res) => {
    const { id } = req.params;
    try {
        const ordertype = await Ordertype.findByPk(id, { attributes: ['id', 'ordertypecd', 'ordertypename', 'minapprovercnt'] });
        res.json(ordertype);
    } catch (error) {
        console.log(error);
    }
}

export const OrdertypenamebyCd = async (req, res) => {
    try {
        const ordertype = await Ordertype.findAll({
            attributes: ['id', 'ordertypecd', 'ordertypename', 'minapprovercnt'],
            where: { ordertypecd: req.params.cd }
        });
        res.json(ordertype);
    } catch (error) {
        console.log(error);
    }
}

