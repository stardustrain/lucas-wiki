import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

interface Props {
  url: string
  identifier: string
  title: string
}

export default function Disqus({ url, identifier, title }: Props) {
  // NOTE: There have an issue: https://github.com/disqus/disqus-react/issues/86
  return (
    <DiscussionEmbed
      shortname="wiki-lucashan-space"
      config={{
        url,
        identifier,
        title,
      }}
    />
  )
}
