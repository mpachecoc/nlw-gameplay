import React, { useState } from 'react'
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

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

export function AppointmentCreate() {
  const [category, setCategory] = useState('')
  const [openGuildModal, setOpenGuildModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

  function handleOpenGuilds() {
    setOpenGuildModal(true)
  }
  
  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected)
    setOpenGuildModal(false)
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Background>
          <Header title="Schedule Match" />

          <Text 
            style={[styles.label, { marginLeft: 24, marginTop: 26, marginBottom: 18 }]}
          >
            Category
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={setCategory}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon 
                  ? <GuildIcon /> 
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
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
              
              <View>
                <Text style={[styles.label, {marginBottom: 10}]}>Hour & Minute</Text>
                
                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, {marginBottom: 10}]}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.characterLimit}>Max. 100</Text>
            </View>
            
            <TextArea multiline maxLength={100} numberOfLines={5} autoCorrect={false} />

            <View style={styles.footer}>
              <Button title="Schedule" />
            </View>
          </View>
        </Background>
      </ScrollView>

      <ModalView visible={openGuildModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}