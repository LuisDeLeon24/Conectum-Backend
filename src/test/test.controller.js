//GET: Obtener todos los países
export const getCountries = async (req, res) => {
  try {
    const result = await global.pgPool.query("SELECT * FROM countries");
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

// GET: Obtener país por ID
export const getCountryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await global.pgPool.query(
      "SELECT * FROM countries WHERE id_country = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    return res.json({ success: true, data: result.rows[0] });

  } catch (error) {
    console.error("Error fetching country:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// POST: Crear país
export const createCountry = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ success: false, message: "Name is required" });

  try {
    const result = await global.pgPool.query(
      "INSERT INTO countries (name) VALUES ($1) RETURNING *",
      [name]
    );

    return res.status(201).json({
      success: true,
      message: "Country created",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error creating country:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// PUT: Actualizar país
export const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await global.pgPool.query(
      "UPDATE countries SET name = $1 WHERE id_country = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    return res.json({
      success: true,
      message: "Country updated",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error updating country:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// DELETE: Eliminar país
export const deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await global.pgPool.query(
      "DELETE FROM countries WHERE id_country = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    return res.json({
      success: true,
      message: "Country deleted",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error deleting country:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};