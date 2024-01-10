const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({
    name,
    email,
  });
};

export default getCurrent;