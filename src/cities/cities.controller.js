export const getCities = async (req, res) => {
  try {
    const result = await global.pgPool.query("SELECT * FROM cities");
    return res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error("Error fetching countries:", error);
    return res.status(500).json({
      success: false,
      message: "Database error"
    });
  }
};


export const getCityById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await global.pgPool.query(
      "SELECT * FROM cities WHERE id_city = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "City not found" });
    }

    return res.json({ success: true, data: result.rows[0] });

  } catch (error) {
    console.error("Error fetching country:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};


export const createCity = async (req, res) => {
  const { name, id_country } = req.body;

  if (!name || !id_country)
    return res.status(400).json({ success: false, message: "Name and id_country is required" });

  try {
    const result = await global.pgPool.query(
      "INSERT INTO cities (name, id_country) VALUES ($1, $2) RETURNING *",
      [name, id_country]
    );

    return res.status(201).json({
      success: true,
      message: "City created",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error creating city:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

export const updateCity = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await global.pgPool.query(
      "UPDATE cities SET name = $1 WHERE id_city = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "City not found" });
    }

    return res.json({
      success: true,
      message: "City updated",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error updating city:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

export const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await global.pgPool.query(
      "DELETE FROM cities WHERE id_city = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "City not found" });
    }

    return res.json({
      success: true,
      message: "City deleted",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error deleting city:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};