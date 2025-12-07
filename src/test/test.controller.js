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