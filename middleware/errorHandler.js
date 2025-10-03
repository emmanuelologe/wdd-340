/* ********************************
 * Global Error Handler Middleware
 ******************************** */
function errorHandler(err, req, res, next) {
  console.error("ERROR:", err.stack)

  let nav = ""
  if (res.locals.nav) {
    nav = res.locals.nav
  }

  res.status(err.status || 500).render("error", {
    title: err.status ? `Error ${err.status}` : "Server Error",
    message: err.message || "Something went wrong!",
    nav,
  })
}

module.exports = errorHandler