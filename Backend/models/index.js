const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Driver = require("./Driver")(sequelize, Sequelize.DataTypes);
db.Buses = require("./Buses")(sequelize, Sequelize.DataTypes);
db.Route = require("./Route")(sequelize, Sequelize.DataTypes);
db.Booking = require("./Booking")(sequelize, Sequelize.DataTypes);

if (db.Driver.associate) db.Driver.associate(db);
if (db.Buses.associate) db.Buses.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
