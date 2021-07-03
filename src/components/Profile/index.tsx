import React from 'react'
import { View, Text, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useAuth } from '../../hooks/auth'

import { Avatar } from '../Avatar'

import { styles } from './styles'

export function Profile() {
  const { user, logout } = useAuth()

  function handleLogout() {
    Alert.alert('Logout', 'Do you want to logout?', 
    [
      {
        text: 'No',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => logout()
      }
    ]
    )
  }

  return (
    <View style={styles.container}>

      <RectButton onPress={handleLogout}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Hi!
          </Text>
          
          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>

        <Text style={styles.message}>
          Today is vistory's day
        </Text>
      </View>
    </View>
  )
}