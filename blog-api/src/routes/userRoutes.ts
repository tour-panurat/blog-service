import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    patchUser,
    getUserPosts,
} from "../controllers/userController";

const router = Router();

// Define routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/:id/posts", getUserPosts);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

export default router;
