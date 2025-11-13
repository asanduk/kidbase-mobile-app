import React, { useState } from 'react';
import { ScrollView, Alert, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Input, InputField } from '@/components/ui/input';
import { Icon, SearchIcon } from '@/components/ui/icon';
import { AppHeader } from '@/components/app-header';
import { SafeAreaView } from '@/components/ui/safe-area-view';

type FilterType = 'Alle' | 'Ungelesen' | 'System';

const mockAnnouncements = [
  {
    id: 1,
    title: 'Team Meeting am Freitag',
    content: 'Bitte alle Teilnehmer um 14:00 Uhr im Konferenzraum. Wir besprechen die neuen Projekte und Ziele für das Quartal.',
    date: '2024-01-15',
    type: 'meeting' as const,
    read: false,
    priority: 'high' as const,
  },
  {
    id: 2,
    title: 'System Update',
    content: 'Das System wird am Wochenende aktualisiert. Bitte speichern Sie alle wichtigen Daten.',
    date: '2024-01-14',
    type: 'system' as const,
    read: true,
    priority: 'medium' as const,
  },
  {
    id: 3,
    title: 'Neue Richtlinien',
    content: 'Die neuen Arbeitsrichtlinien sind jetzt verfügbar. Bitte lesen Sie diese sorgfältig durch.',
    date: '2024-01-13',
    type: 'general' as const,
    read: false,
    priority: 'low' as const,
  },
  {
    id: 4,
    title: 'Wartungsarbeiten',
    content: 'Geplante Wartungsarbeiten am Montag von 20:00 bis 22:00 Uhr.',
    date: '2024-01-12',
    type: 'system' as const,
    read: true,
    priority: 'medium' as const,
  },
];

export default function AnnouncementsPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = mockAnnouncements.filter((a) => !a.read).length;

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    // Filter by selected filter
    if (selectedFilter === 'Ungelesen' && announcement.read) return false;
    if (selectedFilter === 'System' && announcement.type !== 'system') return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        announcement.title.toLowerCase().includes(query) ||
        announcement.content.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const filters: FilterType[] = ['Alle', 'Ungelesen', 'System'];

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <AppHeader />
      <ScrollView className="flex-1">
        <VStack className="p-4 gap-4">
          <Heading className="text-2xl font-bold">Ankündigungen</Heading>

          {/* Search */}
          <Input variant="outline" size="md">
            <Icon as={SearchIcon} className="ml-3" />
            <InputField
              placeholder="Suchen..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Input>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack className="gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={selectedFilter === filter ? 'solid' : 'outline'}
                  action={selectedFilter === filter ? 'primary' : 'secondary'}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <ButtonText>
                    {filter}
                    {filter === 'Ungelesen' && unreadCount > 0 && ` (${unreadCount})`}
                  </ButtonText>
                </Button>
              ))}
            </HStack>
          </ScrollView>

          {/* Announcements List */}
          {filteredAnnouncements.length === 0 ? (
            <Box className="items-center justify-center py-8">
              <Text className="text-typography-600">Keine Ankündigungen gefunden</Text>
            </Box>
          ) : (
            <VStack className="gap-3">
              {filteredAnnouncements.map((announcement) => (
                <Pressable
                  key={announcement.id}
                  onPress={() => {
                    Alert.alert(announcement.title, announcement.content);
                  }}
                >
                  <Card variant="elevated" size="md" className="p-4">
                    <HStack className="items-center justify-between mb-2">
                      <Text className="font-semibold text-lg text-typography-900">
                        {announcement.title}
                      </Text>
                      {!announcement.read && (
                        <Badge size="sm" action="info" variant="solid">
                          <BadgeText>Neu</BadgeText>
                        </Badge>
                      )}
                    </HStack>
                    <Text className="text-typography-600 mb-2" numberOfLines={3}>
                      {announcement.content}
                    </Text>
                    <Text className="text-typography-500 text-xs">{announcement.date}</Text>
                  </Card>
                </Pressable>
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

