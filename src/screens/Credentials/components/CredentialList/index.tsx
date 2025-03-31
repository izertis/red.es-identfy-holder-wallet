import { useMemo, useState } from 'react'
import CredentialStyled from '../../styles'
import { FlatList } from 'react-native'
import CredentialDetail from '../CredentialDetail'
import { CredentialData } from '../../../../services/open-id/types'
import Loading from '../../../../components/Loading'
import ButtonMailbox from '../../../../components/ButtonMailbox'

interface Props {
  credentials: CredentialData[]
}

const CredentialList = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const itemsPerPage = 8
  const totalItems = props.credentials.length
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage])
  const paginatedData = useMemo(() => props.credentials.slice(0, pageNumber * itemsPerPage), [props.credentials, pageNumber, itemsPerPage])

  const handleLoadMore = () => {
    if (pageNumber < totalPages) {
      setIsLoading(true)
      setTimeout(() => {
        setPageNumber(pageNumber + 1)
        setIsLoading(false)
      }, 1000)
    }
  }

  const renderFooter = () => {
    if (!isLoading || pageNumber === totalPages) return null

    return (
      <CredentialStyled.LoadingView>
        <Loading height='-10%' />
      </CredentialStyled.LoadingView>
    )
  }

  return (
    <>
      <CredentialStyled.HeaderContainer>
        <CredentialStyled.ButtonContainer>
          <ButtonMailbox />
        </CredentialStyled.ButtonContainer>
      </CredentialStyled.HeaderContainer>

      <FlatList
        data={paginatedData}
        keyExtractor={(item, index) => `Credential-${index}`}
        renderItem={({ item }) => <CredentialDetail issuer={item.issuer} credential={item.credential} status={item.status} timestamp={item.timestamp} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={{ paddingBottom: 100 }}
      />
    </>
  )
}

export default CredentialList
