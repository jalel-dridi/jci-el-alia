import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'
import {ActivityIcon} from '@sanity/icons'
import {ContentHealthTool} from './quality/ContentHealthTool'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'jci-el-alia',
  title: 'JCI El Alia',

  projectId,
  dataset,

  plugins: [
    structureTool({structure: deskStructure}),
    visionTool(),
  ],

  // "Content health" tab next to Structure: what still needs work (quality/).
  tools: (prev) => [
    ...prev.slice(0, 1),
    {name: 'content-health', title: 'Content health', icon: ActivityIcon, component: ContentHealthTool},
    ...prev.slice(1),
  ],

  schema: {
    types: schemaTypes,
  },
})
