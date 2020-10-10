/* eslint-disable */
import User from "../user";

async function createUserIfNoUsers() {
  const userCount = await User.countDocuments({});
  if (userCount > 0) {
    return;
  }
  const username = process.env.DEFAULT_ROOT_NAME || "root";
  const password = process.env.DEFAULT_ROOT_PASSWORD || 1234;
  User.register(new User({ username }), password, (err) => {
    if (err) {
      console.error("failed to register default user");
      process.exit(1);
    }
  });
}

export { createUserIfNoUsers };
