import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../schema/ProductSchema";

export const useProductForm = () => {
    return useForm({
      resolver: zodResolver(ProductSchema),
    });
  };



