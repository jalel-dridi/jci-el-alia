/**
 * "Open on website" in each document's action menu (next to Publish): opens
 * the live page for an event, or the matching homepage section for anything
 * else, so editors can check what visitors see.
 */
import type {DocumentActionComponent} from 'sanity'
import {LaunchIcon} from '@sanity/icons'

/** Update when the custom domain is connected. */
export const SITE_URL = 'https://jci-el-alia.pages.dev'

const homepageSection: Record<string, string> = {
  project: '#impact',
  president: '#legacy',
  boardMember: '#team',
  pillar: '#about',
}

export const OpenOnWebsite: DocumentActionComponent = (props) => {
  const published = props.published as {slug?: {current?: string}} | null
  const path =
    props.type === 'event'
      ? published?.slug?.current && `/events/${published.slug.current}/`
      : `/${homepageSection[props.type] ?? ''}`

  return {
    label: 'Open on website',
    icon: LaunchIcon,
    disabled: !published || !path,
    title: published
      ? 'The website updates about a minute after publishing (overnight at the latest)'
      : 'Publish first; then it appears on the website',
    onHandle: () => {
      window.open(SITE_URL + path, '_blank', 'noopener')
      props.onComplete()
    },
  }
}
