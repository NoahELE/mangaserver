import { Typography } from 'antd'
import { ReactElement, useState } from 'react'
import { api, Library } from '../request'
import { useStore } from '../store'

const { Title } = Typography

export default function LibraryPage(): ReactElement {
  // set jwt from store
  const jwt = useStore((state) => state.jwt)
  api.setJwt(jwt)

  const [libraries, setLibraries] = useState<Library[]>([])
  api.getAllLibraries().then(setLibraries, alert)

  return (
    <>
      <Title>Library List</Title>
    </>
  )
}
