export const getMe = async (req, res) => {
  res.json({
    message: "Welcome to home",
    userId: req.user.id
  });
};