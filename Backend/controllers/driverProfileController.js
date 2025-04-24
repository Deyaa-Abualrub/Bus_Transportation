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
    const { status } = req.body;

    if (![1, 2, 3, 4].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const bus = await Bus.findOne({ where: { driver_id } });
    if (!bus) return res.status(404).json({ message: "No bus assigned to this driver" });

    bus.status = status;
    await bus.save();

    res.json({ message: "Status updated", status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDriverInfo = async (req, res) => {
  try {
    const { driver_id } = req.params;
    const { full_name, phone_number, oldPassword, newPassword } = req.body;

    const driver = await Driver.findByPk(driver_id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    // Update name and phone if provided
    if (full_name) driver.full_name = full_name;
    if (phone_number) driver.phone_number = phone_number;

    // If password change is requested
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, driver.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }
      const hashedNew = await bcrypt.hash(newPassword, 10);
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