import { z } from 'zod';

export const JenkinsBuildSchema = z.object({
  number: z.number(),
  url: z.string().url(),
  displayName: z.string(),
  result: z.enum(['SUCCESS', 'FAILURE', 'ABORTED', 'UNSTABLE']).optional(),
  timestamp: z.number(),
  building: z.boolean().default(false),
  artifacts: z.array(z.object({ relativePath: z.string() })).optional(),
  changeSet: z
    .object({
      items: z
        .array(
          z.object({
            msg: z.string(),
            commitId: z.string(),
            comment: z.string().optional().nullable(),
          }),
        )
        .optional(),
    })
    .optional(),
});

export type JenkinsBuild = z.infer<typeof JenkinsBuildSchema>;

export const BuildSchema = z.object({
  result: z.enum(['SUCCESS', 'FAILURE', 'ABORTED', 'UNSTABLE']).optional(),
  buildNumber: z.number(),
  url: z.string().url(),
  downloadUrl: z.string().url().nullable(),
  minecraftVersion: z.string(),
  timestamp: z.number(),
  isExperimental: z.boolean(),
  commit: z.object({
    message: z.string().nullable(),
    extraDescription: z.string().nullable(),
    hash: z.string().nullable(),
  }),
  commits: z.array(
    z.object({
      message: z.string().nullable(),
      extraDescription: z.string().nullable(),
      hash: z.string().nullable(),
    }),
  ),
});

export type Build = z.infer<typeof BuildSchema>;
