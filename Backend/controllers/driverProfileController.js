const Driver = require("../models/Driver");
const Bus = require("../models/Buses");
const bcrypt = require("bcrypt");

const getDriverProfile = async (req, res) => {
  try {
    const { driver_id } = req.params;

    const driver = await Driver.findOne({
      where: { driver_id },
      attributes: ["full_name", "email", "phone_number", "created_at"],
      include: [
        {
          model: Bus,
          as: "bus",
          attributes: ["bus_number", "status"],
        },
      ],
    });

    if (!driver) return res.status(404).json({ message: "Driver not found" });

    res.json(driver);
  } catch (err) {
    console.error("🔥 Error in getDriverProfile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBusStatusByDriver = async (req, res) => {
  try {
    const { driver_id } = req.params;
    const { status, fromStatus } = req.body;

    if (![1, 2, 3, 4].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const bus = await Bus.findOne({ where: { driver_id } });
    if (!bus)
      return res
        .status(404)
        .json({ message: "No bus assigned to this driver" });

    // Update additional fields based on status transition
    if (fromStatus === 2) {
      if (status === 3) {
        // When changing from status 2 to 3, update status_change_time to 15 minutes later
        bus.status_change_time = new Date(Date.now() + 15 * 60000);
      } else if (status === 1) {
        // When changing from status 2 to 1, update launch_date to 15 minutes later
        bus.launch_date = new Date(Date.now() + 15 * 60000);
      }
    }

    bus.status = status;
    await bus.save();

    res.json({
      message: "Status updated",
      status,
      status_change_time: bus.status_change_time,
      launch_date: bus.launch_date,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDriverInfo = async (req, res) => {
  try {
    const { driver_id } = req.params;
    const { full_name, phone_number, old_password, new_password } = req.body;

    const driver = await Driver.findByPk(driver_id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    // Update name and phone if provided
    if (full_name) driver.full_name = full_name;
    if (phone_number) driver.phone_number = phone_number;

    // If password change is requested
    if (old_password && new_password) {
      const isMatch = await bcrypt.compare(old_password, driver.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }
      const hashedNew = await bcrypt.hash(new_password, 10);
      driver.password = hashedNew;
    }

    await driver.save();

    res.json({ message: "Driver info updated successfully" });
  } catch (err) {
    console.error("🔥 Error in updateDriverInfo:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getDriverProfile,
  updateBusStatusByDriver,
  updateDriverInfo,
};
