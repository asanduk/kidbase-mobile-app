import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Image, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Card } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { CheckIcon } from '@/components/ui/icon';

const externalLinks = [
  { name: 'AIDA', url: 'https://aida.example.com', image: require('../assets/images/aida.png') },
  { name: 'Kidicap', url: 'https://kidicap.example.com', image: require('../assets/images/kidicap.png') },
  { name: 'CB', url: 'https://cb.example.com', image: require('../assets/images/cb.png') },
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // TODO: Implement actual login logic
    // For now, just navigate to tabs
    router.replace('/tabs');
  };

  const handleExternalLink = async (url: string) => {
    if (Platform.OS === 'web') {
      // For web, use window.open
      if (typeof window !== 'undefined') {
        window.open(url, '_blank');
      }
    } else {
      // For native, use WebBrowser
      await WebBrowser.openBrowserAsync(url);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <VStack className="flex-1 px-6 py-10 gap-12">
            {/* Brand & Form */}
            <VStack
              className="gap-8"
              style={{ maxWidth: 420, width: '100%', alignSelf: 'center' }}
            >
              <VStack className="items-center gap-4">
                <Image
                  source={require('../assets/images/kidbaselogo04.png')}
                  style={{ width: 220, height: 80, resizeMode: 'contain' }}
                />
                <Text className="text-xl text-typography-900 text-center">
                Herzlich willkommen
                </Text>
              </VStack>

              <Card variant="elevated" size="md" className="p-6">
                <VStack className="gap-5">
                  {/* Username Field */}
                  <VStack className="gap-2">
                    <Text className="text-typography-700 font-medium">
                      Benutzername:
                    </Text>
                    <Input variant="outline" size="md">
                      <InputField
                        placeholder="Benutzername eingeben"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </Input>
                  </VStack>

                  {/* Password Field */}
                  <VStack className="gap-2">
                    <Text className="text-typography-700 font-medium">
                      Passwort:
                    </Text>
                    <Input variant="outline" size="md">
                      <InputField
                        placeholder="Passwort eingeben"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </Input>
                  </VStack>

                  {/* Remember Me Checkbox */}
                  <Box className="mt-2">
                    <Checkbox
                      size="md"
                      value="remember"
                      isChecked={rememberMe}
                      onChange={(isChecked) => setRememberMe(isChecked)}
                    >
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel className="ml-3 flex-1">
                        <VStack className="gap-1">
                          <Text className="text-typography-700">
                            Angemeldet bleiben
                          </Text>
                          <Text className="text-typography-500 text-xs">
                            (bitte nur wählen, wenn dieses Gerät ausschließlich von Ihnen
                            benutzt wird)
                          </Text>
                        </VStack>
                      </CheckboxLabel>
                    </Checkbox>
                  </Box>

                  {/* Login Button */}
                  <Button
                    size="lg"
                    action="primary"
                    onPress={handleLogin}
                    className="mt-2"
                    isDisabled={!username || !password}
                  >
                    <ButtonText>Anmelden</ButtonText>
                  </Button>
                </VStack>
              </Card>
            </VStack>

            {/* External Links */}
            <Box
              style={{ maxWidth: 520, width: '100%', alignSelf: 'center' }}
              className="mb-8"
            >
              <Card variant="elevated" size="md" className="p-5">
                <VStack className="gap-3">
                  <HStack className="gap-4 flex-wrap justify-between">
                    {externalLinks.map((link) => (
                      <Pressable
                        key={link.name}
                        onPress={() => handleExternalLink(link.url)}
                        className="w-[30%]"
                      >
                        <Box className="items-center">
                          <Image
                            source={link.image}
                            style={{ width: 80, height: 40, resizeMode: 'contain' }}
                          />
                        </Box>
                      </Pressable>
                    ))}
                  </HStack>
                </VStack>
              </Card>
            </Box>

            <VStack className="items-center gap-1 pb-6">
              <Text className="text-xs text-typography-500">
                © {new Date().getFullYear()} Ev. Kinderheims Jugendhilfe Herne & Wanne Eickel gGmbH
              </Text>
              <Text className="text-xs text-typography-500">
                Kidbase App · Status: Beta
              </Text>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

