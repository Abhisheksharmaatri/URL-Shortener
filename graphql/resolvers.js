// Controllers
const userController = require('../controllers/user');
const urlController = require('../controllers/url');

const resolvers = {
    RootQuery: {
        getLogin: async ({
            email,
            password
        }) => {
            return await userController.getLogin({
                email,
                password
            });
        },
        getUser: async ({
            email
        }) => {
            return await userController.getUser({
                email
            });
        },
        getUrl: async (_, {
            urlCode
        }) => {
            return await urlController.getUrl({
                urlCode
            });
        },
    },
    RootMutation: {
        create: async (_, args, context) => {
            return await userController.create(args);
        },
        createUserUrl: async (_, {
            longUrl,
            userId
        }) => {
            return await urlController.createUrl({
                longUrl,
                userId
            });
        },
        deleteUser: async (_, {
            email
        }) => {
            return await userController.deleteUser({
                email
            });
        },
        deleteUrl: async (_, {
            urlId
        }) => {
            return await urlController.deleteUrl({
                urlId
            });
        },
    },
    UserOutputData: {
        urls: async (user) => {
            return await urlController.getUserUrls({
                userId: user._id
            });
        },
    },
};

module.exports = resolvers;