import { Router } from "express";
import { getMe, updateMe } from "../controllers/user.controller";

const router = Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Unauthorized
 */
router.get("/me", getMe);

/**
 * @openapi
 * /users/me:
 *   put:
 *     summary: Update current user profile
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: "+1-555-123-4567"
 *               address:
 *                 type: string
 *                 example: "New York, USA"
 *     responses:
 *       200:
 *         description: User profile updated
 *       401:
 *         description: Unauthorized
 */
router.put("/me", updateMe);

export default router;
