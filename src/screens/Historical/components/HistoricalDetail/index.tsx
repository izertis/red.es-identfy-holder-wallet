import { DescriptionText } from '../../../../components/atomic_components/Text/variants'
import { View } from '../../../../components/Themed'
import { useTranslation } from 'react-i18next'
import { SCREEN } from '../../../../constants/screens'
import HistoricalStyled from '../../styles'
import historicalI18nKeys from '../../i18n/keys'
import { IconButton } from 'react-native-paper'
import { ColorKeys, getThemeColor } from '../../../../constants/Colors'
import { getTimeFormat } from '../../../../utils/dates'
import { Text } from 'react-native'

interface Props {
  date?: string
  title?: string
  issuer?: string
  key?: string
}

const HistoricalDetail = (props: Props) => {
  const { t } = useTranslation(SCREEN.Historical)

  const showLogTitle = () => {
    switch (props.title) {
      case 'Credential added':
        return {
          message: t(historicalI18nKeys.CREDENTIAL_ADDED),
          icon: 'account-box-outline'
        }
      case 'Credential expired':
        return {
          message: t(historicalI18nKeys.CREDENTIAL_EXPIRED),
          icon: 'clock-fast'
        }
      case 'Presentation emitted':
        return {
          message: t(historicalI18nKeys.PRESENTATION_EMITTED),
          icon: 'folder-move-outline'
        }
      case 'Credential revoked':
        return {
          message: t(historicalI18nKeys.CREDENTIAL_REVOKED),
          icon: 'file-cancel-outline'
        }
      case 'Presentation revoked':
        return {
          message: t(historicalI18nKeys.PRESENTATION_REVOKED),
          icon: 'folder-remove-outline'
        }
      default:
        return {
          message: t(historicalI18nKeys.DEFAULT_MESSAGE),
          icon: 'clock'
        }
    }
  }

  return (
    <HistoricalStyled.HistoricalDetailContainer key={props.key}>
      <IconButton icon={showLogTitle().icon} iconColor={getThemeColor(ColorKeys.secondary)} />
      <View>
        {props.title &&
          <HistoricalStyled.ElementContainer>
            <DescriptionText bold>{showLogTitle().message}</DescriptionText>
          </HistoricalStyled.ElementContainer>
        }
        {props.issuer && (
          <HistoricalStyled.ElementContainer direction='row'>
            <DescriptionText>
              {t(historicalI18nKeys.CREDENTIAL_DETAILS_ISSUER)}
              {': '}
            </DescriptionText>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 210 }}>
                <DescriptionText>{props.issuer}</DescriptionText>
              </Text>
            </View>
          </HistoricalStyled.ElementContainer>
        )}
        {props.date && (
          <HistoricalStyled.ElementContainer direction='row'>
            <DescriptionText>
              {t(historicalI18nKeys.DATE)}
              {': '}
            </DescriptionText>
            <DescriptionText>
              {getTimeFormat(props.date)}
            </DescriptionText>
          </HistoricalStyled.ElementContainer>
        )}
      </View>
    </HistoricalStyled.HistoricalDetailContainer >
  )
}

export default HistoricalDetail
