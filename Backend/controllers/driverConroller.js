exports.registerDriver = async (req, res) => {
  try {
    const { full_name, email, password, phone_number } = req.body;
    const license_img = req.files["license_img"]
      ? req.files["license_img"][0].path
      : null;
    const non_conviction_img = req.files["non_conviction_img"]
      ? req.files["non_conviction_img"][0].path
      : null;

    const newDriver = await Driver.create({
      full_name,
      email,
      password,
      phone_number,
      license_img,
      non_conviction_img,
    });

    res.status(200).json({
      message: "Driver registered successfully",
      driver: newDriver,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering driver", error });
  }
};
