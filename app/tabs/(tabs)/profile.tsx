import React, { useState } from 'react';
import { ScrollView, Alert, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Divider } from '@/components/ui/divider';
import {
  Icon,
  EditIcon,
  UsersIcon,
  MailIcon,
  PhoneIcon,
  BellIcon,
  LockIcon,
  HelpCircleIcon,
  InfoIcon,
  ChevronRightIcon,
} from '@/components/ui/icon';
import { AppHeader } from '@/components/app-header';
import { SafeAreaView } from '@/components/ui/safe-area-view';

const userProfile = {
  name: 'Max Mustermann',
  email: 'max.mustermann@kidbase.de',
  phone: '+49 123 456789',
  company: 'Kidbase GmbH',
  position: 'Pädagoge',
  avatar: 'MM',
};

const menuItems = [
  {
    id: 1,
    title: 'Profilinformationen',
    icon: UsersIcon,
    action: () => Alert.alert('Profilinformationen', 'Profil bearbeiten'),
  },
  {
    id: 2,
    title: 'E-Mail-Einstellungen',
    icon: MailIcon,
    action: () => Alert.alert('E-Mail-Einstellungen', 'E-Mail konfigurieren'),
  },
  {
    id: 3,
    title: 'Kontakt-Einstellungen',
    icon: PhoneIcon,
    action: () => Alert.alert('Kontakt-Einstellungen', 'Kontakte verwalten'),
  },
  {
    id: 4,
    title: 'Benachrichtigungseinstellungen',
    icon: BellIcon,
    action: () => Alert.alert('Benachrichtigungen', 'Benachrichtigungen verwalten'),
  },
  {
    id: 5,
    title: 'Sicherheit',
    icon: LockIcon,
    action: () => Alert.alert('Sicherheit', 'Sicherheitseinstellungen'),
  },
  {
    id: 6,
    title: 'Hilfe & Support',
    icon: HelpCircleIcon,
    action: () => Alert.alert('Hilfe & Support', 'Support kontaktieren'),
  },
  {
    id: 7,
    title: 'Über',
    icon: InfoIcon,
    action: () => Alert.alert('Über', 'Kidbase App v1.0.0'),
  },
];

export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailSyncEnabled, setEmailSyncEnabled] = useState(true);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <AppHeader />
      <ScrollView className="flex-1">
        <VStack className="p-4 gap-6">
          <Heading className="text-2xl font-bold">Profil</Heading>

          {/* Profile Info */}
          <Card variant="elevated" size="md" className="p-4">
            <HStack className="items-center gap-4 mb-4">
              <Avatar size="xl">
                <AvatarFallbackText>{userProfile.avatar}</AvatarFallbackText>
              </Avatar>
              <VStack className="flex-1">
                <Text className="font-semibold text-xl text-typography-900">
                  {userProfile.name}
                </Text>
                <Text className="text-typography-600">{userProfile.position}</Text>
                <Text className="text-typography-600">{userProfile.company}</Text>
              </VStack>
              <Button size="sm" variant="outline" action="secondary">
                <Icon as={EditIcon} size="sm" />
              </Button>
            </HStack>
            <Divider className="my-3" />
            <VStack className="gap-2">
              <HStack className="items-center justify-between">
                <Text className="text-typography-600">E-Mail</Text>
                <Text className="text-typography-900">{userProfile.email}</Text>
              </HStack>
              <HStack className="items-center justify-between">
                <Text className="text-typography-600">Telefon</Text>
                <Text className="text-typography-900">{userProfile.phone}</Text>
              </HStack>
            </VStack>
          </Card>

          {/* Quick Settings */}
          <Card variant="elevated" size="md" className="p-4">
            <Heading className="text-lg font-semibold mb-4">Schnelleinstellungen</Heading>
            <VStack className="gap-4">
              <HStack className="items-center justify-between">
                <VStack className="flex-1">
                  <Text className="font-semibold text-typography-900">Benachrichtigungen</Text>
                  <Text className="text-typography-600 text-sm">
                    Push-Benachrichtigungen aktivieren
                  </Text>
                </VStack>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              </HStack>
              <Divider />
              <HStack className="items-center justify-between">
                <VStack className="flex-1">
                  <Text className="font-semibold text-typography-900">E-Mail-Synchronisation</Text>
                  <Text className="text-typography-600 text-sm">
                    E-Mails automatisch synchronisieren
                  </Text>
                </VStack>
                <Switch value={emailSyncEnabled} onValueChange={setEmailSyncEnabled} />
              </HStack>
              <Divider />
              <HStack className="items-center justify-between">
                <VStack className="flex-1">
                  <Text className="font-semibold text-typography-900">
                    Automatische Synchronisation
                  </Text>
                  <Text className="text-typography-600 text-sm">
                    Daten im Hintergrund aktualisieren
                  </Text>
                </VStack>
                <Switch value={autoSyncEnabled} onValueChange={setAutoSyncEnabled} />
              </HStack>
            </VStack>
          </Card>

          {/* Menu Items */}
          <Card variant="elevated" size="md" className="p-4">
            <Heading className="text-lg font-semibold mb-4">Einstellungen</Heading>
            <VStack className="gap-1.5">
              {menuItems.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={item.action}
                >
                  <HStack className="items-center justify-between py-3 border-b border-outline-100 last:border-b-0">
                    <HStack className="items-center gap-3">
                      <Box className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center">
                        <Icon as={item.icon} size="sm" className="text-primary-500" />
                      </Box>
                      <Text className="text-typography-900 font-medium">
                        {item.title}
                      </Text>
                    </HStack>
                    <Icon as={ChevronRightIcon} size="sm" className="text-outline-400" />
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Card>

          {/* Logout Button */}
          <Button
            size="lg"
            variant="solid"
            action="negative"
            onPress={() => {
              Alert.alert('Abmelden', 'Möchten Sie sich wirklich abmelden?', [
                { text: 'Abbrechen', style: 'cancel' },
                { text: 'Abmelden', style: 'destructive', onPress: () => {} },
              ]);
            }}
          >
            <ButtonText>Abmelden</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

