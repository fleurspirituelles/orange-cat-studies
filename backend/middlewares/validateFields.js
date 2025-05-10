function validateFields(requiredFields) {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body) || req.body[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required field(s): ${missingFields.join(", ")}`,
      });
    }

    next();
  };
}

module.exports = validateFields;