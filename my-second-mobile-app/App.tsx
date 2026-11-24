import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import FAB from './components/FAB';

const STEP_OPTIONS = [1, 5, 10] as const;
const GOAL = 20;

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const progress = Math.min((count / GOAL) * 100, 100);
  const goalReached = count >= GOAL;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Contador Pro</Text>
            <Text style={styles.subtitle}>React Native + Expo</Text>
          </View>

          <View style={styles.counterBox}>
            <Text style={styles.textHuge}>{count}</Text>
          </View>

          <View style={styles.goalSection}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalLabel}>Meta diaria</Text>
              <Text style={styles.goalValue}>
                {count} / {GOAL}
              </Text>
            </View>
            <View style={styles.progressBar}>
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
            <Text style={styles.stepLabel}>Incremento:</Text>
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
                      : styles.stepButtonInactive,
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <Text
                    style={[
                      styles.stepButtonText,
                      isActive
                        ? styles.stepButtonTextActive
                        : styles.stepButtonTextInactive,
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
                onPress={() => setCount((prev) => Math.max(0, prev - step))}
              />
            </View>
            <View style={styles.controlItem}>
              <FAB
                label="Reset"
                variant="danger"
                floating={false}
                disabled={count === 0}
                onPress={() => setCount(0)}
              />
            </View>
            <View style={styles.controlItem}>
              <FAB
                label={`+${step}`}
                variant="primary"
                floating={false}
                onPress={() => setCount((prev) => prev + step)}
                onLongPress={() => setCount(0)}
              />
            </View>
          </View>

          <Text style={styles.helperText}>
            Tip: mantén presionado el botón + para reiniciar
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
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
    alignItems: 'center',
    marginBottom: 24,
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
});
