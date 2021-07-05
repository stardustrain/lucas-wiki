import React from 'react'
import styled from '@emotion/styled'

import { useSeriesContext } from '../contexts/SeriesContext'

import DefaultDropdown from './Dropdown'

const dummy = [
  {
    label: 'Asian water dragon',
    value: 'Asian water dragon',
  },
  {
    label: 'Owl, australian masked',
    value: 'Owl, australian masked',
  },
  {
    label: 'Nile crocodile',
    value: 'Nile crocodile',
  },
  {
    label: 'Red deer',
    value: 'Red deer',
  },
  {
    label: 'Capuchin, weeper',
    value: 'Capuchin, weeper',
  },
  {
    label: 'Colobus, black and white',
    value: 'Colobus, black and white',
  },
  {
    label: 'Gerenuk',
    value: 'Gerenuk',
  },
  {
    label: 'Tern, royal',
    value: 'Tern, royal',
  },
  {
    label: 'Goat, mountain',
    value: 'Goat, mountain',
  },
  {
    label: 'Corella, long-billed',
    value: 'Corella, long-billed',
  },
  {
    label: 'Madagascar fruit bat',
    value: 'Madagascar fruit bat',
  },
  {
    label: 'Common grenadier',
    value: 'Common grenadier',
  },
  {
    label: 'Swamp deer',
    value: 'Swamp deer',
  },
  {
    label: 'Leopard',
    value: 'Leopard',
  },
  {
    label: 'Beaver, european',
    value: 'Beaver, european',
  },
  {
    label: 'Sunbird, lesser double-collared',
    value: 'Sunbird, lesser double-collared',
  },
  {
    label: 'Short-nosed bandicoot',
    value: 'Short-nosed bandicoot',
  },
  {
    label: 'Booby, blue-faced',
    value: 'Booby, blue-faced',
  },
  {
    label: 'Wild water buffalo',
    value: 'Wild water buffalo',
  },
  {
    label: 'Deer, red',
    value: 'Deer, red',
  },
  {
    label: 'Boa, emerald green tree',
    value: 'Boa, emerald green tree',
  },
  {
    label: 'Great kiskadee',
    value: 'Great kiskadee',
  },
  {
    label: 'Kalahari scrub robin',
    value: 'Kalahari scrub robin',
  },
  {
    label: 'Brocket, brown',
    value: 'Brocket, brown',
  },
  {
    label: 'White-throated monitor',
    value: 'White-throated monitor',
  },
  {
    label: 'Goldeneye, common',
    value: 'Goldeneye, common',
  },
  {
    label: 'Carpet snake',
    value: 'Carpet snake',
  },
  {
    label: 'Tortoise, indian star',
    value: 'Tortoise, indian star',
  },
  {
    label: 'Crested barbet',
    value: 'Crested barbet',
  },
  {
    label: 'Jackal, indian',
    value: 'Jackal, indian',
  },
  {
    label: 'Margay',
    value: 'Margay',
  },
  {
    label: 'Monitor, white-throated',
    value: 'Monitor, white-throated',
  },
  {
    label: 'Great horned owl',
    value: 'Great horned owl',
  },
  {
    label: 'Eurasian hoopoe',
    value: 'Eurasian hoopoe',
  },
  {
    label: 'Adouri (unidentified)',
    value: 'Adouri (unidentified)',
  },
  {
    label: 'Raccoon dog',
    value: 'Raccoon dog',
  },
  {
    label: 'Large-eared bushbaby',
    value: 'Large-eared bushbaby',
  },
  {
    label: 'Jackrabbit, white-tailed',
    value: 'Jackrabbit, white-tailed',
  },
  {
    label: 'Vulture, white-headed',
    value: 'Vulture, white-headed',
  },
  {
    label: 'Long-nosed bandicoot',
    value: 'Long-nosed bandicoot',
  },
  {
    label: 'Tortoise, desert',
    value: 'Tortoise, desert',
  },
  {
    label: 'Tawny frogmouth',
    value: 'Tawny frogmouth',
  },
  {
    label: 'Four-spotted skimmer',
    value: 'Four-spotted skimmer',
  },
  {
    label: 'Vulture, bengal',
    value: 'Vulture, bengal',
  },
  {
    label: 'African fish eagle',
    value: 'African fish eagle',
  },
  {
    label: "Leadbeateri's ground hornbill",
    value: "Leadbeateri's ground hornbill",
  },
  {
    label: 'Dragon, komodo',
    value: 'Dragon, komodo',
  },
  {
    label: 'Two-banded monitor',
    value: 'Two-banded monitor',
  },
  {
    label: 'Blue crane',
    value: 'Blue crane',
  },
  {
    label: 'Kangaroo, jungle',
    value: 'Kangaroo, jungle',
  },
]

const Dropdown = styled(DefaultDropdown)`
  button {
    min-width: 200px;
  }
`

interface Props {
  seriesList: string[]
}

export default function SeriesSelector({ seriesList }: Props) {
  const { state, dispatch } = useSeriesContext()

  return (
    <Dropdown
      options={seriesList.map(series => ({
        label: series,
        value: series,
      }))}
      defaultButtonTitle="시리즈 모아 보기"
      onSelect={value => {
        dispatch({
          type: 'SET_SERIES',
          payload: typeof value === 'number' ? value.toString() : value,
        })
      }}
      selectedValue={state.selectedSeries}
    />
  )
}
