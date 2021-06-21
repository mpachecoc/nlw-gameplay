import React from 'react'
import { View, Text, Image, StatusBar } from 'react-native'

import { ButtonIcon } from '../../components/ButtonIcon'
import IllustrationsImg from '../../assets/illustration.png'
import { styles } from './styles'

export function SignIn() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Image
        source={IllustrationsImg}
        style={styles.image} 
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Organize your{'\n'}
          games easily
        </Text>

        <Text style={styles.subtitle}>
          Create groups to play your {'\n'}
          favorite games with your friends
        </Text>

        <ButtonIcon title="Enter with Discord" activeOpacity={0.7} />
      </View>
    </View>
  )
}
