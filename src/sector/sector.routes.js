import { Router } from "express";
import {
  getSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector
} from "./sector.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sectors
 *   description: CRUD de sectores
 */

/**
 * @swagger
 * /Conectum/sectors/get:
 *   get:
 *     summary: Obtener todos los sectores
 *     tags: [Sectors]
 *     responses:
 *       200:
 *         description: Lista de sectores obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_sector:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get("/get", getSectors);

/**
 * @swagger
 * /Conectum/sectors/get/{id}:
 *   get:
 *     summary: Obtener un sector por ID
 *     tags: [Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del sector
 *     responses:
 *       200:
 *         description: Sector encontrado
 *       404:
 *         description: Sector no encontrado
 */
router.get("/get/:id", getSectorById);

/**
 * @swagger
 * /Conectum/sectors/create:
 *   post:
 *     summary: Crear un nuevo sector
 *     tags: [Sectors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Educación
 *     responses:
 *       201:
 *         description: Sector creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/create", createSector);

/**
 * @swagger
 * /Conectum/sectors/update/{id}:
 *   put:
 *     summary: Actualizar un sector por ID
 *     tags: [Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del sector
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Industria
 *     responses:
 *       200:
 *         description: Sector actualizado
 *       404:
 *         description: Sector no encontrado
 */
router.put("/update/:id", updateSector);

/**
 * @swagger
 * /Conectum/sectors/delete/{id}:
 *   delete:
 *     summary: Eliminar un sector por ID
 *     tags: [Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del sector
 *     responses:
 *       200:
 *         description: Sector eliminado
 *       404:
 *         description: Sector no encontrado
 */
router.delete("/delete/:id", deleteSector);

export default router;
