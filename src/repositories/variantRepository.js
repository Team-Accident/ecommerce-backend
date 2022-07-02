const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getVaraintByType(type) {
  try {
    const res = await pool.query(
      "SELECT * FROM variant WHERE variant_type = $1",
      [type]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function getVaraintById(ID) {
  try {
    const res = await pool.query(
      "SELECT * FROM variant WHERE variant_id = $1",
      [ID]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function addVariant(values) {
  try {
    const res = await pool.query(
      "INSERT INTO variant(variant_id,variant_type) VALUES ($1,$2)",
      [values.id, values.type]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function updateVariant(values) {
  try {
    const res = await pool.query(
      "UPDATE variant SET variant_type =$1 WHERE variant_id=$2",
      [ values.type,values.id,]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

module.exports = { addVariant, getVaraintByType,getVaraintById ,updateVariant};