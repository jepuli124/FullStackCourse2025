const notFound = (req, res, next) => {
  const error = new Error('Stuff not Found')
  error.status = 404
  next(error)
}

export default notFound