const pool = require("../database")

/* ***************
 * Get all classification data
 * *************** */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = { getClassifications }


/* ***************
 * Get inventory items and classification_namae by classification_id
 * *************** */
async function getInventoryByClassificationId(classificationId) {
    try {
        const data = await pool.query(
            `SELECT *FROM public.inventory AS i
            JOIN public.classification AS c 
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
            [classificationId]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationById error " + error)
    }
}

module.exports = { getClassifications, getInventoryByClassificationId }