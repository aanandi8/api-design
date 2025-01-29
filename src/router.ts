import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  createUpdateItem,
  deleteUpdateItem,
  getOneUpdateItem,
  getUpdateItems,
  updateUpdateItem,
} from "./handlers/update-item";
const router = Router();
/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("title").exists(),
  body("body").exists(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Item
 */
router.get("/update-item", getUpdateItems);
router.get("/update-item/:id", getOneUpdateItem);
router.put(
  "/update-item/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  createUpdateItem
);
router.post(
  "/update-item",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  updateUpdateItem
);
router.delete("/update-item/:id", deleteUpdateItem);
router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "in router handler" });
});

export default router;
