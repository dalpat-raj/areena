import { z } from "zod";


export const SellerSchema = z.object({
    complateAddress: z
    .string()
    .min(10, { message: "Complete address should be at least 10 characters!" }),
    landmark: z.string().optional(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Enter a valid 6-digit pincode!" }),

    name: z.string().min(3, {message: "name is required!"}),
    phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Enter a valid 10-digit phone number!" }),
    email: z.string().email({ message: "Invalid email address!" }).optional(),
    // role: z.enum([]),

    shopName: z.string().min(4, {message: "name is required!"}),
    description: z.string().optional(),
    password: z.string().min(8, {message: "Password should be 8 character!"}),

    operationalDays: z.array(z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]))
    .nonempty({ message: "Please select at least one operational day" })
    .max(7, { message: "You can select all 7 days maximum" }),
    openTime: z.string(),
    closeTime: z.string(),
})