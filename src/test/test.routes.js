import { Router } from "express";
import { 
  getCountries, 
  getCountryById, 
  createCountry, 
  updateCountry, 
  deleteCountry 
} from "./test.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: CRUD de países
 */

/**
 * @swagger
 * /Conectum/test/get:
 *   get:
 *     summary: Obtener todos los países
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: Lista de países obtenida correctamente
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
router.get("/get", getCountries);

/**
 * @swagger
 * /Conectum/test/get/{id}:
 *   get:
 *     summary: Obtener un país por ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del país
 *     responses:
 *       200:
 *         description: País encontrado
 *       404:
 *         description: País no encontrado
 */
router.get("/get/:id", getCountryById);

/**
 * @swagger
 * /Conectum/test/create:
 *   post:
 *     summary: Crear un nuevo país
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Guatemala
 *     responses:
 *       201:
 *         description: País creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/create", createCountry);

/**
 * @swagger
 * /Conectum/test/update/{id}:
 *   put:
 *     summary: Actualizar un país por ID
 *     tags: [Countries]
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
 *         description: País actualizado
 *       404:
 *         description: País no encontrado
 */
router.put("/update/:id", updateCountry);

/**
 * @swagger
 * /Conectum/test/delete/{id}:
 *   delete:
 *     summary: Eliminar un país por ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del país
 *     responses:
 *       200:
 *         description: País eliminado
 *       404:
 *         description: País no encontrado
 */
router.delete("/delete/:id", deleteCountry);

export default router;
