import React, { useState } from 'react';
import { Linking, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Icon, SearchIcon, PhoneIcon, MailIcon } from '@/components/ui/icon';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { AppHeader } from '@/components/app-header';
import { SafeAreaView } from '@/components/ui/safe-area-view';

const mockContacts = [
  {
    id: 1,
    name: 'Anna Schmidt',
    phone: '+49 123 456789',
    email: 'anna.schmidt@example.com',
    company: 'Kidbase GmbH',
  },
  {
    id: 2,
    name: 'Peter Müller',
    phone: '+49 123 456790',
    email: 'peter.mueller@example.com',
    company: 'Kidbase GmbH',
  },
  {
    id: 3,
    name: 'Maria Weber',
    phone: '+49 123 456791',
    email: 'maria.weber@example.com',
    company: 'Kidbase GmbH',
  },
  {
    id: 4,
    name: 'Thomas Fischer',
    phone: '+49 123 456792',
    email: 'thomas.fischer@example.com',
    company: 'Kidbase GmbH',
  },
  {
    id: 5,
    name: 'Lisa Wagner',
    phone: '+49 123 456793',
    email: 'lisa.wagner@example.com',
    company: 'Kidbase GmbH',
  },
];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter((contact) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.phone.includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert('Fehler', 'Telefonnummer konnte nicht geöffnet werden');
    });
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert('Fehler', 'E-Mail konnte nicht geöffnet werden');
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <AppHeader />
      <ScrollView className="flex-1">
        <VStack className="p-4 gap-4">
          <Heading className="text-2xl font-bold">Kontakte</Heading>

          {/* Search */}
          <Input variant="outline" size="md">
            <Icon as={SearchIcon} className="ml-3" />
            <InputField
              placeholder="Suchen (Name, Telefon, E-Mail)..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Input>

          {/* Contacts List */}
          {filteredContacts.length === 0 ? (
            <Box className="items-center justify-center py-8">
              <Text className="text-typography-600">Keine Kontakte gefunden</Text>
            </Box>
          ) : (
            <VStack className="gap-3">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} variant="elevated" size="md" className="p-4">
                  <HStack className="items-center gap-3 mb-3">
                    <Avatar size="lg">
                      <AvatarFallbackText>
                        {contact.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallbackText>
                    </Avatar>
                    <VStack className="flex-1">
                      <Text className="font-semibold text-lg text-typography-900">
                        {contact.name}
                      </Text>
                      <Text className="text-typography-600">{contact.company}</Text>
                    </VStack>
                  </HStack>
                  <VStack className="gap-2 mb-3">
                    <HStack className="items-center gap-2">
                      <Icon as={PhoneIcon} size="sm" className="text-typography-600" />
                      <Text className="text-typography-700">{contact.phone}</Text>
                    </HStack>
                    <HStack className="items-center gap-2">
                      <Icon as={MailIcon} size="sm" className="text-typography-600" />
                      <Text className="text-typography-700">{contact.email}</Text>
                    </HStack>
                  </VStack>
                  <HStack className="gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      action="primary"
                      onPress={() => handleCall(contact.phone)}
                      className="flex-1"
                    >
                      <Icon as={PhoneIcon} size="sm" />
                      <ButtonText>Anrufen</ButtonText>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      action="primary"
                      onPress={() => handleEmail(contact.email)}
                      className="flex-1"
                    >
                      <Icon as={MailIcon} size="sm" />
                      <ButtonText>E-Mail</ButtonText>
                    </Button>
                  </HStack>
                </Card>
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

