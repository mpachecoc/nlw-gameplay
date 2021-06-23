import React from 'react'
import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ButtonIcon } from '../../components/ButtonIcon'
import IllustrationsImg from '../../assets/illustration.png'
import { styles } from './styles'

export function SignIn() {
  const navigation = useNavigation()

  function handleSignIn() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Image
        source={IllustrationsImg}
        style={styles.image} 
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Connect & organize {'\n'}
          your games
        </Text>

        <Text style={styles.subtitle}>
          Create groups to play your {'\n'}
          favorite games with your friends
        </Text>

        <ButtonIcon
          title="Enter with Discord"
          onPress={handleSignIn}
        />
      </View>
    </View>
  )
}
