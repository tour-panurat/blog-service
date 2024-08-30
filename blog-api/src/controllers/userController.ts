import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Joi from 'joi';

const prisma = new PrismaClient();

// Get all users with optional filtering
export const getUsers = async (req: Request, res: Response) => {
    const { username, email, city, page = 1, limit = 10 } = req.query;
  
    // Convert page and limit to integers
    const pageNumber = Number(page);
    const pageSize = Number(limit);
  
    // Basic validation for page and limit
    if (pageNumber < 1 || pageSize < 1) {
      return res.status(400).json({ error: "Page and limit must be positive integers." });
    }
  
    try {
      const users = await prisma.user.findMany({
        where: {
          ...(username && {
            username: { contains: String(username), mode: "insensitive" },
          }),
          ...(email && {
            email: { contains: String(email), mode: "insensitive" },
          }),
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
  
      // Optionally, you can also return total count for client-side pagination
      const totalUsers = await prisma.user.count({
        where: {
          ...(username && {
            username: { contains: String(username), mode: "insensitive" },
          }),
          ...(email && {
            email: { contains: String(email), mode: "insensitive" },
          }),
          ...(city && {
            address: {
              city: { contains: String(city), mode: "insensitive" },
            },
          }),
        },
      });
  
      res.json({
        users,
        total: totalUsers,
        page: pageNumber,
        limit: pageSize,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users." });
    }
  };
  

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        address: {
          include: {
            geo: true, // Include Geo data
          },
        },
        company: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the user." });
  }
};


// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, username, email, phone, website, address, company } = req.body;

  try {
    // Check if a user with the same username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        phone,
        website,
        address: {
          create: {
            ...address,
            geo: address.geo ? { create: address.geo } : undefined,
          },
        },
        company: {
          create: company,
        },
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user." });
  }
};

// Update a user by ID
// Define a Joi schema for validation
const userUpdateSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  website: Joi.string().required(),
  address: Joi.object({
    street: Joi.string().optional(),
    suite: Joi.string().optional(),
    city: Joi.string().optional(),
    zipcode: Joi.string().optional(),
    geo: Joi.object({
      lat: Joi.string().optional(),
      lng: Joi.string().optional(),
    }).optional(),
  }).optional(),
  company: Joi.object({
    name: Joi.string().optional(),
    catchPhrase: Joi.string().optional(),
    bs: Joi.string().optional(),
  }).optional(),
});

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate request body
  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, username, email, phone, website, address, company } = req.body;

  try {
    if (username || email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username: username }, { email: email }],
          NOT: { id: Number(id) }, // Exclude current user from duplicate check
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Username or email already exists." });
      }
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        username,
        email,
        phone,
        website,
        address: {
          update: {
            street: address?.street,
            suite: address?.suite,
            city: address?.city,
            zipcode: address?.zipcode,
            geo: address?.geo
              ? {
                  upsert: {
                    create: address.geo,
                    update: address.geo,
                  },
                }
              : undefined,
          },
        },
        company: {
          update: {
            name: company?.name,
            catchPhrase: company?.catchPhrase,
            bs: company?.bs,
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};


export const patchUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, username, email, phone, website, address, company } = req.body;

  try {
    // Check for duplicates if username or email is being updated
    if (username || email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username: username }, { email: email }],
          NOT: { id: Number(id) }, // Exclude current user from duplicate check
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username or email already exists." });
      }
    }

    // Update the user
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name ?? undefined,
        username: username ?? undefined,
        email: email ?? undefined,
        phone: phone ?? undefined,
        website: website ?? undefined,
        address: address
          ? {
              update: {
                street: address.street ?? undefined,
                suite: address.suite ?? undefined,
                city: address.city ?? undefined,
                zipcode: address.zipcode ?? undefined,
                geo: address.geo
                  ? {
                      upsert: {
                        create: address.geo,
                        update: address.geo,
                      },
                    }
                  : undefined,
              },
            }
          : undefined,
        company: company
          ? {
              update: {
                name: company.name ?? undefined,
                catchPhrase: company.catchPhrase ?? undefined,
                bs: company.bs ?? undefined,
              },
            }
          : undefined,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

      await prisma.geo.deleteMany({
        where: { address: { userId: Number(id) } }, // Delete geo associated with the user's address
      });

      // Delete associated Address and Company records first
      await prisma.address.deleteMany({
        where: { userId: Number(id) }, // Delete addresses associated with the user
      });
  
      await prisma.company.deleteMany({
        where: { userId: Number(id) }, // Delete companies associated with the user
      });

  await prisma.post.deleteMany({
        where: { userId: Number(id) }, // Delete addresses associated with the user
      });
      // Now delete the user
      await prisma.user.delete({
        where: { id: Number(id) },
      });
  
      res.status(204).end(); // No content response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete user." });
    }
  };

export const getUserPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const posts = await prisma.post.findMany({
      where: { userId: Number(id) },
    });


    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts." });
  }
};
