// Controllers
const userController = require('../controllers/user');
const urlController = require('../controllers/url');

const resolvers = {
    getLogin: async (args) => {
        return await userController.getLogin({
            email: args.email,
            password: args.password
        });
    },
    getUser: async (args) => {
        return await userController.getUser({
            email: args.email
        });
    },
    getUrl: async (args) => {
        return await urlController.getUrl({
            urlCode: args.urlCode
        })
    },
    create: async (args) => {
        return await userController.create({
            email: args.email,
            name: args.name,
            password: args.password
        });
    },
    createUserUrl: async (args) => {
        return await urlController.createUrl({
            longUrl: args.longUrl,
            email: args.email
        });
    },
    deleteUser: async (args) => {
        return await userController.delete({
            email: args.email
        });
    },
    deleteUrl: async (args) => {
        return await urlController.deleteUrl({
            urlId: args.urlId
        });
    }
}

module.exports = resolvers;