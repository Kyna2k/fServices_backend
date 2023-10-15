const route = (app) => {
    app.get("/",(req,res) => {
        console.log(process.env.DATABASE);
    })
};

module.exports = route;
