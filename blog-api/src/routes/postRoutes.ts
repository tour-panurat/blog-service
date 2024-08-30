import { Router } from 'express';
import { getPosts, createPost, getPostById, updatePost, patchPost, deletePost } from '../controllers/postController';

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.patch("/:id", patchPost);
router.delete("/:id", deletePost);

export default router;
