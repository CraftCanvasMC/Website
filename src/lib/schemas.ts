import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000)
});

export const serverConfigSchema = z.object({
  name: z.string().min(1),
  host: z.string().refine(
    (val) => {
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return ipPattern.test(val) || urlPattern.test(val);
    },
    { message: 'Must be a valid IP address or URL' }
  ),
  port: z.number().min(1).max(65535),
  maxPlayers: z.number().min(1).max(100000)
});

export const downloadSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Invalid version format'),
  platform: z.enum(['windows', 'linux', 'macos']),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms')
});

export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional()
});

export type User = z.infer<typeof userSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
export type ServerConfig = z.infer<typeof serverConfigSchema>;
export type Download = z.infer<typeof downloadSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
