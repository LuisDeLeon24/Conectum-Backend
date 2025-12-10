// GET: Obtener todos los sectores
export const getSectors = async (req, res) => {
  try {
    const result = await global.pgPool.query("SELECT * FROM sectors");
    return res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error("Error fetching sectors:", error);
    return res.status(500).json({
      success: false,
      message: "Database error"
    });
  }
};

// GET: Obtener sector por ID
export const getSectorById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await global.pgPool.query(
      "SELECT * FROM sectors WHERE id_sector = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sector not found" });
    }

    return res.json({ success: true, data: result.rows[0] });

  } catch (error) {
    console.error("Error fetching sector:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// POST: Crear sector
export const createSector = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ success: false, message: "Name is required" });

  try {
    const result = await global.pgPool.query(
      "INSERT INTO sectors (name) VALUES ($1) RETURNING *",
      [name]
    );

    return res.status(201).json({
      success: true,
      message: "Sector created",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error creating sector:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// PUT: Actualizar sector
export const updateSector = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await global.pgPool.query(
      "UPDATE sectors SET name = $1 WHERE id_sector = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sector not found" });
    }

    return res.json({
      success: true,
      message: "Sector updated",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error updating sector:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// DELETE: Eliminar sector
export const deleteSector = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await global.pgPool.query(
      "DELETE FROM sectors WHERE id_sector = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sector not found" });
    }

    return res.json({
      success: true,
      message: "Sector deleted",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error deleting sector:", error);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};
