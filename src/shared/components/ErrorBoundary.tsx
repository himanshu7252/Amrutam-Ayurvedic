import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { logger } from '@infrastructure/logging/logger';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    logger.error('ErrorBoundary', 'Unhandled React Component Crash caught by ErrorBoundary', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="warning-outline" size={54} color="#D32F2F" />
            </View>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.subtitle}>
              An unexpected error occurred in the application. Our team has been notified.
            </Text>

            {this.state.error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{this.state.error.toString()}</Text>
              </View>
            ) : null}

            <Button
              title="Restart / Try Again"
              onPress={this.handleReset}
              variant="primary"
              size="lg"
              leftIcon={<Ionicons name="refresh" size={18} color="#FFFFFF" />}
              style={styles.button}
            />
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF6',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#D32F2F',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C281B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#4A5B48',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 300,
  },
  errorBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8EFE9',
    width: '100%',
    marginBottom: 24,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#D32F2F',
  },
  button: {
    minWidth: 200,
  },
});
