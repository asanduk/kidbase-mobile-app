import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, Animated, Easing } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';
import {
  Icon,
  UsersIcon,
  CalendarDaysIcon,
  PlayIcon,
  MailIcon,
  HelpCircleIcon,
  ClockIcon,
  MessageCircleIcon,
  ChevronRightIcon,
} from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/app-header';
import { SafeAreaView } from '@/components/ui/safe-area-view';

// Mock data
const mockMitarbeiter = {
  name: 'Max Mustermann',
  gruppe: 'Via Annie',
};

const mockAnkündigungen = [
  {
    id: 1,
    title: 'Team Meeting am Freitag',
    content: 'Bitte alle Teilnehmer um 14:00 Uhr im Konferenzraum.',
    date: '2024-01-15',
    type: 'meeting' as const,
    read: false,
    priority: 'high' as const,
  },
  {
    id: 2,
    title: 'System Update',
    content: 'Das System wird am Wochenende aktualisiert.',
    date: '2024-01-14',
    type: 'system' as const,
    read: true,
    priority: 'medium' as const,
  },
];

const mockEmails = [
  {
    id: 1,
    from: 'Anna Schmidt',
    subject: 'Wichtige Information',
    preview: 'Bitte um Rückmeldung bis morgen...',
    date: '2024-01-15',
    unread: true,
  },
  {
    id: 2,
    from: 'Peter Müller',
    subject: 'Terminbestätigung',
    preview: 'Ihr Termin wurde bestätigt...',
    date: '2024-01-14',
    unread: false,
  },
];

const exploreLinks = [
  { name: 'Ausweis', icon: UsersIcon, url: 'https://example.com/ausweis' },
  { name: 'Buchungssystem', icon: CalendarDaysIcon, url: 'https://example.com/buchungssystem' },
  { name: 'Datenschutz-Video', icon: PlayIcon, url: 'https://example.com/datenschutz-video' },
  { name: 'E-Mail Signatur erstellen', icon: MailIcon, url: 'https://example.com/email-signatur' },
  { name: 'FAQ', icon: HelpCircleIcon, url: 'https://example.com/faq' },
  { name: 'Stundennachweis', icon: ClockIcon, url: 'https://example.com/stundennachweis' },
  {
    name: 'Ticketsystem / Supportanfrage',
    icon: MessageCircleIcon,
    url: 'https://example.com/ticketsystem',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [showWave, setShowWave] = useState(false);
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setShowWave(true);
    waveAnim.setValue(0);
    Animated.sequence([
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(1800),
      Animated.timing(waveAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowWave(false);
    });
  }, [waveAnim]);

  const waveBaseStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      right: 16,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    }),
    []
  );

  const waveAnimatedStyle = {
    opacity: waveAnim,
    transform: [
      {
        translateY: waveAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0, 0],
        }),
      },
      {
        rotate: waveAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['0deg', '14deg', '0deg'],
        }),
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <AppHeader />
      <ScrollView className="flex-1">
        <VStack className="p-4 gap-6">
          {/* Welcome Section */}
          <Card variant="elevated" size="md" className="p-6 overflow-visible">
            <Box className="relative">
              <VStack className="gap-2">
                <VStack className="gap-1">
                  <Heading className="text-2xl font-semibold text-typography-900">
                    Willkommen zurück!
                  </Heading>
                  <Text className="text-typography-600">
                    Schönen Tag,{" "}
                    <Text className="font-semibold text-typography-900">
                      {mockMitarbeiter.name}
                    </Text>
                  </Text>
                </VStack>

                <HStack className="items-center gap-2 pt-1">
                  <Icon as={UsersIcon} size="sm" className="text-secondary-500" />
                  <Text className="text-sm italic text-typography-500">
                    {mockMitarbeiter.gruppe}
                  </Text>
                </HStack>
              </VStack>

              {showWave && (
                <Animated.View style={[waveBaseStyle, waveAnimatedStyle]} pointerEvents="none">
                  <Text className="text-4xl">👋</Text>
                </Animated.View>
              )}
            </Box>
          </Card>

          {/* Ankündigungen */}
          <Card variant="elevated" size="md" className="p-4">
            <HStack className="items-center justify-between mb-3">
              <Heading className="text-lg font-semibold">Ankündigungen</Heading>
              <Button
                size="sm"
                variant="link"
                onPress={() => router.push('/tabs/announcements')}
              >
                <ButtonText>Mehr anzeigen</ButtonText>
              </Button>
            </HStack>
            <VStack className="gap-3">
              {mockAnkündigungen.map((announcement) => (
                <Box key={announcement.id}>
                  <HStack className="items-start gap-2 mb-1">
                    {!announcement.read && (
                      <Badge size="sm" action="info" variant="solid">
                        <BadgeText>Neu</BadgeText>
                      </Badge>
                    )}
                    <VStack className="flex-1">
                      <Text className="font-semibold text-typography-900">
                        {announcement.title}
                      </Text>
                      <Text className="text-typography-600 text-sm" numberOfLines={2}>
                        {announcement.content}
                      </Text>
                      <Text className="text-typography-500 text-xs mt-1">
                        {announcement.date}
                      </Text>
                    </VStack>
                  </HStack>
                  {announcement.id !== mockAnkündigungen.length && <Divider className="my-2" />}
                </Box>
              ))}
            </VStack>
          </Card>

          {/* E-Mails */}
          <Card variant="elevated" size="md" className="p-4">
            <HStack className="items-center justify-between mb-3">
              <Heading className="text-lg font-semibold">Posteingang</Heading>
              <Button size="sm" variant="link" onPress={() => router.push('/tabs/mail')}>
                <ButtonText>Mehr anzeigen</ButtonText>
              </Button>
            </HStack>
            <VStack className="gap-3">
              {mockEmails.map((email) => (
                <Box key={email.id}>
                  <HStack className="items-start gap-2">
                    <VStack className="flex-1">
                      <Text className="font-semibold text-typography-900">{email.from}</Text>
                      <HStack className="items-center gap-2">
                        <Text className="text-typography-900">{email.subject}</Text>
                        {email.unread && (
                          <Text className="text-secondary-500 text-xs uppercase tracking-[2px]">
                            Ungelesen
                          </Text>
                        )}
                      </HStack>
                      <Text className="text-typography-600 text-sm" numberOfLines={1}>
                        {email.preview}
                      </Text>
                      <Text className="text-typography-500 text-xs mt-1">{email.date}</Text>
                    </VStack>
                  </HStack>
                  {email.id !== mockEmails.length && <Divider className="my-2" />}
                </Box>
              ))}
            </VStack>
          </Card>

          {/* Explore Section */}
          <Card variant="elevated" size="md" className="p-4">
            <Heading className="text-lg font-semibold mb-4">Bereiche</Heading>
            <VStack className="gap-1.5">
              {exploreLinks.map((link) => (
                <Pressable
                  key={link.name}
                  onPress={() => {
                    Alert.alert('Öffnen', `Öffne ${link.name}`);
                  }}
                >
                  <HStack className="items-center justify-between py-3 border-b border-outline-100 last:border-b-0">
                    <HStack className="items-center gap-3">
                      <Box className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center">
                        <Icon as={link.icon} size="sm" className="text-primary-500" />
                      </Box>
                      <Text className="text-typography-900 font-medium">
                        {link.name}
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

