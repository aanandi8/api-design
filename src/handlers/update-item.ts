import prisma from "../db";
// TODO: Get this done
export const getUpdateItems = async (req, res) => {
  const updateItems = await prisma.updateItem.findMany({
    where: {
      update: {
        product: {
          belongsToId: req.user.id,
        },
      },
    },
  });
  res.json({ data: updateItems });
};
export const getOneUpdateItem = async (req, res) => {
  const updateItem = await prisma.updateItem.findUnique({
    where: {
      id: req.params.id,
      update: {
        product: {
          belongsToId: req.user.id,
        },
      },
    },
  });
  res.json({ data: updateItem });
};
export const createUpdateItem = async (req, res) => {
  try {
    const updateItem = await prisma.updateItem.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        update: {
          connect: {
            id: req.body.updateId,
            product: {
              belongsToId: req.user.id,
            },
          },
        },
      },
    });

    res.json({ data: updateItem });
  } catch (error) {
    res.status(400).json({ message: "Not able to create a new update item" });
  }
};
export const updateUpdateItem = async (req, res) => {
  try {
    const updatedUpdateItem = await prisma.updateItem.update({
      where: {
        id: req.params.id,
        update: {
          product: {
            belongsToId: req.user.id,
          },
        },
      },
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });
    res.json({ data: updatedUpdateItem });
  } catch (error) {
    return res.status(404).json({ message: "Update item not found" });
  }
};

export const deleteUpdateItem = async (req, res) => {
  try {
    const deletedUpdateItem = await prisma.updateItem.delete({
      where: {
        id: req.params.id,
        update: {
          product: {
            belongsToId: req.user.id,
          },
        },
      },
    });
    res.json({ data: deletedUpdateItem });
  } catch (e) {
    res.status(404).json({ message: "Update item not found" });
  }
};
