import React, { useState } from 'react';
import { ScrollView, Alert, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Icon, SearchIcon } from '@/components/ui/icon';
import { Fab, FabIcon } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import { AppHeader } from '@/components/app-header';
import { SafeAreaView } from '@/components/ui/safe-area-view';

type FilterType = 'Alle' | 'Ungelesen';

const mockMails = [
  {
    id: 1,
    from: 'Anna Schmidt',
    email: 'anna.schmidt@example.com',
    subject: 'Wichtige Information',
    preview: 'Bitte um Rückmeldung bis morgen. Wir müssen die Details besprechen...',
    date: '2024-01-15',
    unread: true,
    important: true,
  },
  {
    id: 2,
    from: 'Peter Müller',
    email: 'peter.mueller@example.com',
    subject: 'Terminbestätigung',
    preview: 'Ihr Termin wurde bestätigt. Bitte erscheinen Sie pünktlich...',
    date: '2024-01-14',
    unread: false,
    important: false,
  },
  {
    id: 3,
    from: 'Maria Weber',
    email: 'maria.weber@example.com',
    subject: 'Projekt Update',
    preview: 'Das Projekt schreitet gut voran. Hier ist der aktuelle Stand...',
    date: '2024-01-13',
    unread: true,
    important: false,
  },
  {
    id: 4,
    from: 'Thomas Fischer',
    email: 'thomas.fischer@example.com',
    subject: 'Dringend: Rückmeldung erforderlich',
    preview: 'Bitte geben Sie uns bis heute Abend Rückmeldung...',
    date: '2024-01-12',
    unread: true,
    important: true,
  },
];

export default function MailPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = mockMails.filter((m) => m.unread).length;

  const filteredMails = mockMails.filter((mail) => {
    // Filter by selected filter
    if (selectedFilter === 'Ungelesen' && mail.unread === false) return false;
    // Only show unread when selected filter is Ungelesen

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        mail.from.toLowerCase().includes(query) ||
        mail.subject.toLowerCase().includes(query) ||
        mail.preview.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const filters: FilterType[] = ['Alle', 'Ungelesen'];

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <AppHeader />
      <ScrollView className="flex-1">
        <VStack className="p-4 gap-4">
          <Heading className="text-2xl font-bold">E-Mail</Heading>

          {/* Search */}
          <Input variant="outline" size="md">
            <Icon as={SearchIcon} className="ml-3" />
            <InputField
              placeholder="Suchen (Absender, Betreff)..."
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

          {/* Mails List */}
          {filteredMails.length === 0 ? (
            <Box className="items-center justify-center py-8">
              <Text className="text-typography-600">Keine E-Mails gefunden</Text>
            </Box>
          ) : (
            <VStack className="gap-3">
              {filteredMails.map((mail) => (
                <Pressable
                  key={mail.id}
                  onPress={() => {
                    Alert.alert(mail.subject, mail.preview);
                  }}
                >
                  <Card
                    variant="elevated"
                    size="md"
                    className={`p-5 border ${
                      mail.unread
                        ? 'bg-primary-50 border-primary-200 shadow-soft-2'
                        : 'bg-background-0 border-outline-100'
                    }`}
                  >
                    <VStack className="gap-3">
                      <HStack className="items-start justify-between">
                        <VStack className="gap-1">
                          <Text className="text-sm font-semibold text-typography-900">
                            {mail.from}
                          </Text>
                          <Text className="text-xs text-typography-500">{mail.email}</Text>
                        </VStack>
                        {mail.unread && (
                          <Box className="bg-secondary-100 px-3 py-1 rounded-full">
                            <Text className="text-secondary-600 text-xs uppercase tracking-[2px]">
                              Ungelesen
                            </Text>
                          </Box>
                        )}
                      </HStack>

                      <VStack className="gap-1">
                        <Text className="text-lg font-semibold text-typography-900">
                          {mail.subject}
                        </Text>
                        <Text className="text-typography-600 text-sm" numberOfLines={2}>
                          {mail.preview}
                        </Text>
                      </VStack>

                      <HStack className="items-center justify-between pt-2">
                        <Text className="text-typography-500 text-xs">{mail.date}</Text>
                        <Button size="xs" variant="link">
                          <ButtonText>Lesen</ButtonText>
                        </Button>
                      </HStack>
                    </VStack>
                  </Card>
                </Pressable>
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
      <Fab
        onPress={() => {
          Alert.alert('Neue E-Mail', 'Neue E-Mail schreiben');
        }}
        className="m-6"
        size="lg"
      >
        <FabIcon as={AddIcon} />
      </Fab>
    </SafeAreaView>
  );
}

