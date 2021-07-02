import React from 'react'
import { ImageBackground, Text, View, FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { ListHeader } from '../../components/ListHeader'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'
import BannerImg from '../../assets/banner.png'

export function AppointmentDetails() {
  const members = [
    {
      id: '1',
      username: 'Mauricio',
      avatar_url: 'https://github.com/mpachecoc.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Mauricio',
      avatar_url: 'https://github.com/mpachecoc.png',
      status: 'online'
    }
  ]
  return (
    <Background>
      <Header 
        title="Details" 
        action={
          <BorderlessButton>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>

          <Text style={styles.subtitle}>
            It's today that we are gonna arrive to the challenge without losing.
          </Text>
        </View>
      </ImageBackground>

      <ListHeader 
        title="Players"
        subtitle="Total 3"
      />

      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Get Me In!" />
      </View>
    </Background>
  )
}