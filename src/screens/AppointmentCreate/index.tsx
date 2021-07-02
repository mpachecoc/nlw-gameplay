import React, { useState } from 'react'
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { CategorySelect } from '../../components/CategorySelect'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from '../Guilds'
import { GuildProps } from '../../components/Guild'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'

export function AppointmentCreate() {
  const [category, setCategory] = useState('')
  const [openGuildModal, setOpenGuildModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleOpenGuilds() {
    setOpenGuildModal(true)
  }

  function handleCloseGuilds() {
    setOpenGuildModal(false)
  }
  
  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected)
    setOpenGuildModal(false)
  }

  function handleCategorySelected(categoryId: string) {
    setCategory(categoryId)
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4,
      guild,
      category,
      date: `${day}/${month} at ${hour}:${minute}h`,
      description
    }

    const storaged = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const appointments = storaged ? JSON.parse(storaged) : []

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS, 
      JSON.stringify([...appointments, newAppointment])
    )

    navigation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Schedule Match" />

          <Text 
            style={[styles.label, { marginLeft: 24, marginTop: 26, marginBottom: 18 }]}
          >
            Category
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={handleCategorySelected}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                  : <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {
                      guild.name 
                      ? guild.name 
                      : 'Choose a server'
                    }
                  </Text>
                </View>

                <Feather name="chevron-right" size={18} color={theme.colors.heading} />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, {marginBottom: 10}]}>Day & Month</Text>
                
                <View style={styles.column}>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setMonth}
                  />
                </View>
              </View>
              
              <View>
                <Text style={[styles.label, {marginBottom: 10}]}>Hour & Minute</Text>
                
                <View style={styles.column}>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, {marginBottom: 10}]}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.characterLimit}>Max. 100</Text>
            </View>
            
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false} 
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Schedule" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildModal} closeModal={handleCloseGuilds} >
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}