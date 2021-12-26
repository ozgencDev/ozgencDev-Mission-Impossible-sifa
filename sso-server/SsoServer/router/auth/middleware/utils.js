function getCleanUser(user) {
  if (!user) return null;
  return {
    userId: user.id,
    name: user.user_name,
    username: user.username,
    email: user.email,
    user_type: user.user_type,
  };
}

module.exports = {
  getCleanUser,
};
