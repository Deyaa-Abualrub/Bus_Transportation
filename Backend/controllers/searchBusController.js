// controllers/searchBusController.js
const Bus = require("../models/Buses");

const searchBus = async (req, res) => {
  try {
    const { from, to, searchType } = req.body;
    console.log("Received data:", req.body);

    if (!from || !to || !searchType) {
      return res.status(400).json({ message: "Invalid search parameters" });
    }

    if (from !== "hu" && to !== "hu") {
      return res
        .status(400)
        .json({ message: "Either 'from' or 'to' must be 'hu'" });
    }

    let buses;
    if (from === "hu") {
      buses = await Bus.findAll({
        where: {
          bus_route: to,
          status: 3,
        },
        attributes: [
          "bus_route",
          "bus_number",
          "price",
          "seat_number",
          "status_change_time",
        ],
      });
    } else {
      buses = await Bus.findAll({
        where: {
          bus_route: from,
          status: 1,
        },
        attributes: [
          "bus_route",
          "bus_number",
          "price",
          "seat_number",
          "launch_date",
        ],
      });
    }

    if (buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found for the selected route" });
    }

    res.status(200).json(buses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while searching for buses" });
  }
};

module.exports = {
  searchBus,
};
