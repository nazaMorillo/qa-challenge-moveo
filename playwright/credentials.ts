//credentials.ts
import dotenv from 'dotenv';

dotenv.config();

export const UserCredentials = {
  standard_user: {
    userName: 'standard_user' as const,
    password: process.env.STANDARD_USER || '',
  },
  locked_out_user: {
    userName: 'locked_out_user' as const,
    password: process.env.LOCKED_OUT_USER || ''
  },
  problem_user: {
    userName: 'problem_user' as const,
    password: process.env.PROBLEM_USER || ''
  },
  performance_glitch_user: {
    userName: 'performance_glitch_user' as const,
    password: process.env.PERFORMANCE_GLITCH_USER || ''
  },
  error_user: {
    userName: 'error_user' as const,
    password: process.env.ERROR_USER || ''
  },
  visual_user: {
    userName: 'visual_user' as const,
    password: process.env.VISUAL_USER || ''
  }
} as const;

export type UserType = keyof typeof UserCredentials;