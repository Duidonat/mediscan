import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppBar } from '../../components/AppBar';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { MedicineListItem } from '../../components/MedicineListItem';
import { Screen } from '../../components/Screen';
import { StatCard } from '../../components/StatCard';
import { RootStackParamList } from '../../navigation/types';
import { getVaultItems } from '../../services/vaultStorage';
import { useTheme } from '../../theme/ThemeProvider';
import { ScanStatus, UserMedicine } from '../../types/Medicine';
import { daysUntilExpiry, formatDate, isExpired, isExpiringSoon } from '../../utils/date';

function deriveDisplayStatus(item: UserMedicine): ScanStatus | 'Expiring Soon' {
  if (isExpired(item.expirationDate)) return 'Expired';
  if (isExpiringSoon(item.expirationDate)) return 'Expiring Soon';
  return item.scanStatus;
}

function SectionHeader({
  title,
  onViewAll,
}: {
  title: string;
  onViewAll?: () => void;
}) {
  const { colors, fonts, fontSizes, spacing } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
      }}
    >
      <Text style={{ fontFamily: fonts.displayMedium, fontSize: fontSizes.lg, color: colors.text }}>
        {title}
      </Text>
      {onViewAll ? (
        <Pressable accessibilityRole="button" onPress={onViewAll} hitSlop={8}>
          <Text style={{ fontFamily: fonts.bodySemibold, fontSize: fontSizes.sm, color: colors.brand }}>
            View all
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors, fonts, fontSizes, radius, spacing } = useTheme();
  const [items, setItems] = useState<UserMedicine[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVault = useCallback(async () => {
    setLoading(true);
    try {
      const vaultItems = await getVaultItems();
      setItems(vaultItems);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadVault();
    }, [loadVault]),
  );

  const stats = useMemo(() => {
    const total = items.length;
    const verified = items.filter((item) => item.scanStatus === 'Verified' && !isExpired(item.expirationDate)).length;
    const needsVerification = items.filter((item) => item.scanStatus === 'Needs Verification' && !isExpired(item.expirationDate)).length;
    const expiringSoon = items.filter((item) => isExpiringSoon(item.expirationDate)).length;
    return { total, verified, needsVerification, expiringSoon };
  }, [items]);

  const recentScans = useMemo(
    () =>
      [...items]
        .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
        .slice(0, 3),
    [items],
  );

  const reminderPreview = useMemo(
    () =>
      items
        .filter((item) => isExpiringSoon(item.expirationDate))
        .sort((a, b) => {
          const daysA = daysUntilExpiry(a.expirationDate) ?? Number.MAX_SAFE_INTEGER;
          const daysB = daysUntilExpiry(b.expirationDate) ?? Number.MAX_SAFE_INTEGER;
          return daysA - daysB;
        })
        .slice(0, 2),
    [items],
  );

  const hasVaultItems = items.length > 0;

  return (
    <Screen>
      <AppBar
        showLogo
        subtitle="Scan. Identify. Save. Stay Safe."
        rightAction={
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Pressable
              accessibilityLabel="Notifications"
              onPress={() => navigation.navigate('MainTabs', { screen: 'Reminders' })}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.brandDeep} />
            </Pressable>
          </View>
        }
      />

      <View style={{ gap: spacing.lg }}>
        <View>
          <Text style={{ fontFamily: fonts.display, fontSize: fontSizes.xl, color: colors.text }}>
            Hello, there! 👋
          </Text>
          <Text
            style={{
              fontFamily: fonts.body,
              fontSize: fontSizes.sm,
              color: colors.textMuted,
              marginTop: spacing.xs,
            }}
          >
            Take care, stay safe.
          </Text>
        </View>

        <Card style={{ backgroundColor: colors.brandLight, marginBottom: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <View style={{ flex: 1, gap: spacing.sm }}>
              <Text style={{ fontFamily: fonts.displayMedium, fontSize: fontSizes.lg, color: colors.brandDeep }}>
                Quick Scan
              </Text>
              <Text style={{ fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.textMuted }}>
                Scan a medicine label, box, blister pack, barcode, or pill.
              </Text>
              <Button
                title="Start Scanning"
                onPress={() => navigation.navigate('ChooseScanType')}
                icon={<Ionicons name="camera-outline" size={18} color={colors.textInverse} />}
                style={{ alignSelf: 'flex-start', marginTop: spacing.xs }}
              />
            </View>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: radius.lg,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: colors.brand,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="medical-outline" size={36} color={colors.brand} />
            </View>
          </View>
        </Card>

        {loading ? (
          <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.brand} />
          </View>
        ) : !hasVaultItems ? (
          <EmptyState
            title="Your vault is empty"
            message="Scan your first medicine to see overview stats, recent scans, and expiry reminders here."
            action={
              <Button title="Start Scanning" onPress={() => navigation.navigate('ChooseScanType')} />
            }
          />
        ) : (
          <>
            <View>
              <SectionHeader
                title="Medicine Overview"
                onViewAll={() => navigation.navigate('MainTabs', { screen: 'Vault' })}
              />
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <StatCard label="Total" value={stats.total} tone="brand" icon="shield-outline" />
                <StatCard label="Verified" value={stats.verified} tone="success" icon="checkmark-circle-outline" />
              </View>
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                <StatCard
                  label="Needs Verification"
                  value={stats.needsVerification}
                  tone="warning"
                  icon="alert-circle-outline"
                />
                <StatCard
                  label="Expiring Soon"
                  value={stats.expiringSoon}
                  tone="warning"
                  icon="calendar-outline"
                />
              </View>
            </View>

            <View>
              <SectionHeader
                title="Recent Scans"
                onViewAll={() => navigation.navigate('MainTabs', { screen: 'Vault' })}
              />
              {recentScans.map((item) => (
                <MedicineListItem
                  key={item.userMedicineId}
                  name={item.displayName}
                  subtitle={item.dosageForm || item.genericName}
                  meta={
                    item.expirationDate
                      ? `Expires on ${formatDate(item.expirationDate)}`
                      : `Saved ${formatDate(item.savedAt.slice(0, 10))}`
                  }
                  status={deriveDisplayStatus(item)}
                  imageUri={item.imageUri}
                  onPress={() =>
                    navigation.navigate('MedicineDetails', { userMedicineId: item.userMedicineId })
                  }
                />
              ))}
            </View>

            <View>
              <SectionHeader
                title="Upcoming Reminders"
                onViewAll={() => navigation.navigate('MainTabs', { screen: 'Reminders' })}
              />
              {reminderPreview.length > 0 ? (
                reminderPreview.map((item) => {
                  const days = daysUntilExpiry(item.expirationDate);
                  return (
                    <MedicineListItem
                      key={`reminder-${item.userMedicineId}`}
                      name={item.displayName}
                      subtitle={item.dosageForm || item.genericName}
                      meta={
                        days !== undefined
                          ? `Expires in ${days} day${days === 1 ? '' : 's'}`
                          : 'Expiry date not detected'
                      }
                      status="Expiring Soon"
                      imageUri={item.imageUri}
                      onPress={() =>
                        navigation.navigate('MedicineDetails', { userMedicineId: item.userMedicineId })
                      }
                    />
                  );
                })
              ) : (
                <EmptyState
                  title="No upcoming expiry alerts"
                  message="Medicines expiring within 30 days will appear here."
                />
              )}
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: spacing.sm,
          }}
        >
          <Text style={{ fontFamily: fonts.bodySemibold, fontSize: fontSizes.base, color: colors.text }}>
            Family Profile
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Family profile selector"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.pill,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            }}
          >
            <Ionicons name="person-outline" size={16} color={colors.brandDeep} />
            <Text style={{ fontFamily: fonts.bodySemibold, fontSize: fontSizes.sm, color: colors.text }}>
              Me
            </Text>
            <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
