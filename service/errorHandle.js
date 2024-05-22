module.exports = ({ res, error }) => {
  let errorMessages = error.message
  if(error.errors) {
    errorMessages = Object.values(error.errors).map(error => error.message);
  }

  res.status(400).send({
    status: false,
    message: errorMessages || error.message
  }).end()
}
