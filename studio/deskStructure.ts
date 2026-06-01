import type {StructureResolver} from 'sanity/structure'

/**
 * Custom dashboard sidebar.
 * - "Site Settings" is a singleton (one editable document, no list).
 * - The rest are normal document lists, ordered for a content editor's
 *   mental model: the stuff they touch most (Events) first.
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('JCI El Alia')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('event').title('Events / News'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('president').title('Legacy Timeline'),
      S.documentTypeListItem('boardMember').title('Board Members'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('pillar').title('Pillars'),
    ])
