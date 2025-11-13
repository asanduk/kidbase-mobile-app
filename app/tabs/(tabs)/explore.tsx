import React, { useState } from 'react';
import { Alert, ScrollView, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Input, InputField } from '@/components/ui/input';
import {
  Icon,
  SearchIcon,
  UsersIcon,
  CalendarDaysIcon,
  HelpCircleIcon,
  MessageCircleIcon,
  ClockIcon,
  MailIcon,
  PlayIcon,
  ChevronRightIcon,
} from '@/components/ui/icon';
import { AppHeader } from '@/components/app-header';
import { SafeAreaView } from '@/components/ui/safe-area-view';

const bereicheData = [
  { name: 'Ausweis', icon: UsersIcon },
  { name: 'Buchungssystem', icon: CalendarDaysIcon },
  { name: 'Datenschutz-Video', icon: PlayIcon },
  { name: 'E-Mail Signatur erstellen', icon: MailIcon },
  { name: 'FAQ', icon: HelpCircleIcon },
  { name: 'Stundennachweis', icon: ClockIcon },
  { name: 'Ticketsystem / Supportanfrage', icon: MessageCircleIcon },
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');

  const filteredBereiche = bereicheData.filter((bereich) => {
    if (!search) return true;
    return bereich.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <AppHeader />
      <ScrollView className="flex-1">
        <VStack className="p-4 gap-4">
          <Heading className="text-2xl font-bold text-typography-900">Bereiche</Heading>

          {/* Search */}
          <Input variant="outline" size="md">
            <Icon as={SearchIcon} className="ml-3" />
            <InputField
              placeholder="Bereich suchen..."
              value={search}
              onChangeText={setSearch}
            />
          </Input>

          {/* Bereiche Grid */}
          <Card variant="elevated" size="md" className="p-4">
            <VStack className="gap-1.5">
              {filteredBereiche.map((bereich) => (
                <Pressable
                  key={bereich.name}
                  onPress={() => {
                    Alert.alert('Öffnen', `Öffne ${bereich.name}`);
                  }}
                >
                  <HStack className="items-center justify-between py-3 border-b border-outline-100 last:border-b-0">
                    <HStack className="items-center gap-3">
                      <Box className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center">
                        <Icon as={bereich.icon} size="sm" className="text-primary-500" />
                      </Box>
                      <Text className="text-typography-900 font-medium">
                        {bereich.name}
                      </Text>
                    </HStack>
                    <Icon as={ChevronRightIcon} size="sm" className="text-outline-400" />
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

