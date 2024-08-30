import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Get all posts with optional filtering
export const getPosts = async (req: Request, res: Response) => {
  const { title, userId, page = 1, limit = 10 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const posts = await prisma.post.findMany({
      where: {
        ...(title && { title: { contains: String(title), mode: 'insensitive' } }),
        ...(userId && { userId: Number(userId) }),
      },
      include: {
        user: true,
      },
      skip,
      take: Number(limit),
    });

    const totalPosts = await prisma.post.count({
      where: {
        ...(title && { title: { contains: String(title), mode: 'insensitive' } }),
        ...(userId && { userId: Number(userId) }),
      },
    });

    res.json({ posts, total: totalPosts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        user: true, // Include user data for the post
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the post." });
  }
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { title, body, userId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        body,
        userId: Number(userId), // Ensure userId is a number
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post." });
  }
};

// Update an existing post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title ?? undefined,
        body: body ?? undefined,
      },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post." });
  }
};

// Patch an existing post (partial update)
export const patchPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title ?? undefined,
        body: body ?? undefined,
      },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post." });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post." });
  }
};
