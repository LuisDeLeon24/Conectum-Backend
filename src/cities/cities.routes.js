import { Router } from "express";
import { 
  getCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} from "./cities.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: Cities crud
 */

/**
 * @swagger
 * /Conectum/cities/get:
 *   get:
 *     summary: Obtener todas las ciudades
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Ciudades obtenidas de manera corecta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get("/get", getCities);

/**
 * @swagger
 * /Conectum/cities/get/{id}:
 *   get:
 *     summary: Obtener una ciudad por ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Ciudad encontrado
 *       404:
 *         description: Ciudad no encontrado
 */
router.get("/get/:id", getCityById);

/**
 * @swagger
 * /Conectum/cities/create:
 *   post:
 *     summary: Crear una nueva ciudad
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Quetzal
 *               id_country:
 *                 type: integer
 *                 description: id del pais de la ciudad
 *                 example: 1
 *             required:
 *               - name
 *               - id_country
 *     responses:
 *       '201':
 *         description: Ciudad creada exitosamente
 *       '400':
 *         description: Error en los datos enviados 
 */
router.post("/create", createCity);


/**
 * @swagger
 * /Conectum/cities/update/{id}:
 *   put:
 *     summary: Actualizar una ciudad por ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del país
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Argentina
 *     responses:
 *       200:
 *         description: Ciudad actualizado
 *       404:
 *         description: ciudad no encontrado
 */
router.put("/update/:id", updateCity);

/**
 * @swagger
 * /Conectum/cities/delete/{id}:
 *   delete:
 *     summary: Eliminar una ciudad por ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Ciudad eliminada
 *       404:
 *         description: Ciudad no encontrado
 */
router.delete("/delete/:id", deleteCity);

export default router;