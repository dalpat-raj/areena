// import * as z from "zod";

import { z } from "zod";


export const ProductSchema = z.object({
  sku: z.string().min(5, {message: "Stock keeping unit are required!"}),
  barcode: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must be lowercase, use hyphens to separate words, and contain no special characters.",
  }),
  taxcode: z.string().optional(),

  title: z.string().min(5,{message: "minium 5 word"}).max(150),
  description: z.string().min(10, {message: "product description is required!"}),
  productCollection: z.string().min(1, { message: "Please select collections!"}),
  categories: z.string().min(1, {message: "Please select categories!"}),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  warranty: z.coerce.number().optional(),
  warrantyType: z.string().optional(),
  material: z.string().optional(),
  origin: z.string().optional(),
  images: z
  .array(z.instanceof(File))
  .min(2, { message: "Please upload at least 2 images." }),

  originalPrice: z.coerce.number().optional(),
  sellingPrice: z.coerce.number().min(200, { message : 'Selling Price more than Rs. 200'}),

  discount: z.object({
    discountTitle: z.string().optional(),
    discountAmount: z.coerce.number(),
    discountType: z.enum(["percentage", "fixed"]),
    discountEndDate: z.date().optional(),
  }).optional(),

  stock: z.coerce.number().min(1, {message: "stock must be at least 1"}),
  status: z.enum(["draft", "active", "outOfStock", "archived", "discontinued"]),

  dimension: z.object({
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    depth: z.coerce.number().optional(),
    dimensionUnit: z.enum(["cm", "inch"]).default("cm"),
    weightValue: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1" }),
    weightUnit: z.enum(["g", "kg", "oz", "lb"]),
    shippingClass: z.enum(["light", "fragile", "standard", "fragileHeavy"]),
  }).refine(data => data.weightValue > 0, {
    message: "Weight value must be positive",
    path: ["weightValue"]
  }),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    publishedAt: z.date().optional(),

    version: z.coerce.number().optional(),
    metadata: z.record(z.any()).optional()
});


