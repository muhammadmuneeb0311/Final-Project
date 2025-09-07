// middleware/validate.js
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // issues is guaranteed when success = false
    const errors = result.error.issues.map((issue) => issue.message);
    return res.status(400).json({ errors });
  }

  // attach parsed data back to req
  req.body = result.data;
  next();
};

module.exports = validate;
