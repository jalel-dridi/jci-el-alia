import {defineCliConfig} from 'sanity/cli'

/**
 * Sanity CLI configuration.
 * projectId / dataset are filled in after `sanity login` + project creation.
 * They are read from environment variables with a placeholder fallback so the
 * same config works locally and in CI (Cloudflare / Sanity hosting).
 */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  /** Studio will be hosted at https://<studioHost>.sanity.studio */
  studioHost: 'jcielalia',
  deployment: {autoUpdates: true, appId: 'd2xyljbmq3zm0i6jstk3gy0i'},
})
