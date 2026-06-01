// Reusable trilingual objects
import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'

// Document types
import {siteSettings} from './documents/siteSettings'
import {event} from './documents/event'
import {president} from './documents/president'
import {project} from './documents/project'
import {boardMember} from './documents/boardMember'
import {partner} from './documents/partner'
import {pillar} from './documents/pillar'

export const schemaTypes = [
  // objects
  localeString,
  localeText,
  // documents
  siteSettings,
  event,
  president,
  project,
  boardMember,
  partner,
  pillar,
]
