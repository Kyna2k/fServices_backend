const ApiRoute = require('./apis/index');


const route = (app) => {
    app.use('/api',ApiRoute)
};

module.exports = route;
