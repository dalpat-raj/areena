

import { z } from "zod";


export const CheckoutSchema = z.object({
    name: z.string().min(3, {message: "name is required!"}),
    email: z.string().email({ message: "Invalid email address!" }).optional(),
    phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Enter a valid 10-digit phone number!" }),
    address1: z.string().min(5, {message: "Enter valid address!"}),
    address2: z.string().optional(),
    country: z.string().default("India"),
    state: z.string().min(2, { message: "Choose a valid state!" }),
    city: z.string().min(2, { message: "Choose a valid city!" }),
    pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Enter a valid 6-digit pincode!" })
})