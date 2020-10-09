import models from "../index";

async function createUserIfNoUsers() {
    const userCount = await models.User.countDocuments({})
    if (userCount > 0) {
        return;
    }
    const username = process.env.DEFAULT_ROOT_NAME || 'root';
    const password = process.env.DEFAULT_ROOT_PASSWORD || 1234;
    models.User.register(new models.User({username}), password, (err, user) => {
        if (err) {
            console.error("failed to register default user");
            process.exit(1)
        }
    })
}

export {createUserIfNoUsers}