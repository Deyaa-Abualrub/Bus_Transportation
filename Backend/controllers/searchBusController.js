const Bus = require("../models/Buses");
const { Op } = require("sequelize");

const searchBus = async (req, res) => {
  try {
    const { from, to, searchType } = req.body;

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
          "seat_available",
          "status_change_time",
          "bus_image",
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
          "seat_available",
          "launch_date",
          "bus_image",
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

const addNewBus = async (req, res) => {
  const { seats, area } = req.body;
  const imageFile = req.file;

  if (!seats || !area || !imageFile) {
    return res
      .status(400)
      .json({ error: "Seats, area, and image are required." });
  }

  try {
    // Get all buses in this area
    const areaBuses = await Bus.findAll({
      where: { bus_route: area },
    });

    // Format area name with first letter uppercase
    const areaNameFormatted =
      area.charAt(0).toUpperCase() + area.slice(1).toLowerCase();

    // Find the highest number used in this area's bus numbers
    let maxNumber = 0;
    areaBuses.forEach((bus) => {
      if (bus.bus_number && bus.bus_number.startsWith(areaNameFormatted)) {
        const parts = bus.bus_number.split(" ");
        const num = parseInt(parts[1]);
        if (!isNaN(num) && num > maxNumber) {
          maxNumber = num;
        }
      }
    });

    const newBusNumber = `${areaNameFormatted} ${maxNumber + 1}`;

    // Optional: generate gps_device
    let maxGps = 0;
    areaBuses.forEach((bus) => {
      if (bus.gps_device && bus.gps_device.startsWith("GPS-")) {
        const gpsNum = parseInt(bus.gps_device.split("-")[1]);
        if (!isNaN(gpsNum) && gpsNum > maxGps) maxGps = gpsNum;
      }
    });
    const newGpsDevice = `GPS-${maxGps + 1}`;

    const lastBus = areaBuses[areaBuses.length - 1];
    const price = lastBus?.price || "0.00";
    const launchDate =
      lastBus?.launch_date || lastBus?.status_change_time || new Date();

    const newBus = await Bus.create({
      bus_number: newBusNumber,
      seat_available: seats,
      bus_route: area,
      bus_image: `/Uploads/${imageFile.filename}`,
      price: price,
      launch_date: launchDate,
      gps_device: newGpsDevice,
      driver_id: null,
      status: 4,
      route_id: null,
    });

    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    console.error("Error adding new bus:", error);
    res.status(500).json({ error: "Failed to add new bus" });
  }
};

module.exports = {
  searchBus,
  addNewBus,
};
