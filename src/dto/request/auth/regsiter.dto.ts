import { z } from "zod";

export const signupDto = z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    email: z.string()
        .email({ message: "Invalid email address" })
        .trim()
        .toLowerCase()
        .max(255, { message: "Email is too long" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(15, { message: "Password must be at most 15 characters long" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
            { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }
        ),

})

export type signupDto = z.infer<typeof signupDto>

