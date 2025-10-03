const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ************************
 * Build inventory by classification view
 * ************************ */
invCont.buildByClassificationId = async function (req, res, next) {
    const classificationId = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classificationId)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    let className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ************************
 * Build single vehicle detail view
 * ************************ */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const data = await invModel.getInventoryById(inv_id)
  let nav = await utilities.getNav()

  if (!data) {
    return res.status(404).render("error", {
      title: "Vehicle Not Found",
      message: "Sorry, that vehicle could not be found.",
      nav
    })
  }

  const detail = await utilities.buildVehicleDetail(data)

  res.render("./inventory/detail", {
    title: `${data.inv_year} ${data.inv_make} ${data.inv_model}`,
    nav,
    detail,
  })
}

/* ************************
 * Trigger a 500 error intentionally
 * ************************ */
invCont.triggerError = async function (req, res, next) {
  try {
    throw new Error("Intentional server error for testing.")
  } catch (err) {
    next(err) // pass to middleware
  }
}

module.exports = invCont