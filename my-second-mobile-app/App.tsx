import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import FAB from './components/FAB';

interface HistoryItem {
  id: string;
  action: string;
  result: number;
}

const STEP_OPTIONS = [1, 5, 10] as const;
const GOAL = 20;

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [totalTaps, setTotalTaps] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const progress = Math.min((count / GOAL) * 100, 100);
  const goalReached = count >= GOAL;

  const addHistoryEntry = (action: string, result: number) => {
    const entry: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      action,
      result,
    };
    setHistory((prev) => [entry, ...prev].slice(0, 4));
  };

  const handleIncrement = () => {
    const nextCount = count + step;
    setCount(nextCount);
    setTotalTaps((prev) => prev + 1);
    setMaxCount((prev) => (nextCount > prev ? nextCount : prev));
    addHistoryEntry(`+${step}`, nextCount);
  };

  const handleDecrement = () => {
    if (count === 0) return;
    const nextCount = Math.max(0, count - step);
    setCount(nextCount);
    setTotalTaps((prev) => prev + 1);
    addHistoryEntry(`-${step}`, nextCount);
  };

  const handleReset = () => {
    if (count === 0) return;
    setCount(0);
    setTotalTaps((prev) => prev + 1);
    addHistoryEntry('Reset', 0);
  };

  const theme = {
    screenBg: isDark ? '#0F172A' : '#F1F5F9',
    cardBg: isDark ? '#1E293B' : '#FFFFFF',
    surfaceBg: isDark ? '#334155' : '#F8FAFC',
    border: isDark ? '#334155' : '#E2E8F0',
    textPrimary: isDark ? '#F8FAFC' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.screenBg }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.screenBg },
        ]}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: theme.cardBg, borderColor: theme.border },
          ]}
        >
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                Contador Pro
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                React Native + Expo
              </Text>
            </View>
            <Pressable
              onPress={() => setIsDark((prev) => !prev)}
              style={({ pressed }) => [
                styles.themeButton,
                {
                  backgroundColor: theme.surfaceBg,
                  borderColor: theme.border,
                },
                pressed && { opacity: 0.75 },
              ]}
            >
              <Text
                style={[styles.themeButtonText, { color: theme.textPrimary }]}
              >
                {isDark ? 'Claro' : 'Oscuro'}
              </Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.counterBox,
              { backgroundColor: theme.surfaceBg, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.textHuge, { color: theme.textPrimary }]}>
              {count}
            </Text>
          </View>

          <View style={styles.goalSection}>
            <View style={styles.goalHeader}>
              <Text style={[styles.goalLabel, { color: theme.textSecondary }]}>
                Meta diaria
              </Text>
              <Text style={[styles.goalValue, { color: theme.textPrimary }]}>
                {count} / {GOAL}
              </Text>
            </View>
            <View
              style={[styles.progressBar, { backgroundColor: theme.border }]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: goalReached ? '#16A34A' : '#2563EB',
                  },
                ]}
              />
            </View>
            {goalReached && (
              <View style={styles.goalBadge}>
                <Text style={styles.goalBadgeText}>¡Meta alcanzada!</Text>
              </View>
            )}
          </View>

          <View style={styles.stepRow}>
            <Text style={[styles.stepLabel, { color: theme.textSecondary }]}>
              Incremento:
            </Text>
            {STEP_OPTIONS.map((option) => {
              const isActive = step === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => setStep(option)}
                  style={({ pressed }) => [
                    styles.stepButton,
                    isActive
                      ? styles.stepButtonActive
                      : {
                          backgroundColor: isDark
                            ? theme.surfaceBg
                            : theme.screenBg,
                        },
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <Text
                    style={[
                      styles.stepButtonText,
                      isActive
                        ? styles.stepButtonTextActive
                        : { color: theme.textPrimary },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.controlsRow}>
            <View style={styles.controlItem}>
              <FAB
                label={`-${step}`}
                variant="secondary"
                floating={false}
                disabled={count === 0}
                onPress={handleDecrement}
              />
            </View>
            <View style={styles.controlItem}>
              <FAB
                label="Reset"
                variant="danger"
                floating={false}
                disabled={count === 0}
                onPress={handleReset}
              />
            </View>
            <View style={styles.controlItem}>
              <FAB
                label={`+${step}`}
                variant="primary"
                floating={false}
                onPress={handleIncrement}
                onLongPress={handleReset}
              />
            </View>
          </View>

          <Text style={[styles.helperText, { color: theme.textSecondary }]}>
            Tip: mantén presionado el botón + para reiniciar
          </Text>

          <View style={styles.metricsRow}>
            <View
              style={[
                styles.metricCard,
                { backgroundColor: theme.surfaceBg, borderColor: theme.border },
              ]}
            >
              <Text
                style={[styles.metricLabel, { color: theme.textSecondary }]}
              >
                Máximo alcanzado
              </Text>
              <Text style={[styles.metricValue, { color: theme.textPrimary }]}>
                {maxCount}
              </Text>
            </View>
            <View
              style={[
                styles.metricCard,
                { backgroundColor: theme.surfaceBg, borderColor: theme.border },
              ]}
            >
              <Text
                style={[styles.metricLabel, { color: theme.textSecondary }]}
              >
                Total de toques
              </Text>
              <Text style={[styles.metricValue, { color: theme.textPrimary }]}>
                {totalTaps}
              </Text>
            </View>
          </View>

          <View style={styles.historySection}>
            <Text style={[styles.historyTitle, { color: theme.textPrimary }]}>
              Historial reciente
            </Text>
            {history.length === 0 ? (
              <Text
                style={[styles.historyEmpty, { color: theme.textSecondary }]}
              >
                Sin movimientos aún
              </Text>
            ) : (
              <View style={styles.historyList}>
                {history.map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.historyItem,
                      {
                        backgroundColor: theme.surfaceBg,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.historyAction,
                        { color: theme.textPrimary },
                      ]}
                    >
                      {item.action}
                    </Text>
                    <Text
                      style={[
                        styles.historyResult,
                        { color: theme.textSecondary },
                      ]}
                    >
                      → {item.result}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  themeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  themeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  counterBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHuge: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  goalSection: {
    marginTop: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  goalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  goalBadge: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#DCFCE7',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  goalBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginRight: 4,
  },
  stepButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  stepButtonActive: {
    backgroundColor: '#2563EB',
  },
  stepButtonInactive: {
    backgroundColor: '#F1F5F9',
  },
  stepButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepButtonTextActive: {
    color: '#FFFFFF',
  },
  stepButtonTextInactive: {
    color: '#0F172A',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  controlItem: {
    flex: 1,
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  historySection: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  historyEmpty: {
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 8,
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '600',
  },
  historyResult: {
    fontSize: 14,
    fontWeight: '600',
  },
});
