import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Button } from '../Button';
import { ThemeProvider } from '@shared/context/ThemeContext';
import { Text } from 'react-native';

describe('Shared Button Primitive', () => {
  it('should render title text correctly', () => {
    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(
        <ThemeProvider>
          <Button title="Book Consultation" />
        </ThemeProvider>
      );
    });

    const textNodes = tree?.root.findAllByType(Text);
    const hasText = textNodes?.some((node) => node.props.children === 'Book Consultation');
    expect(hasText).toBe(true);
  });

  it('should trigger onPress handler when clicked', () => {
    const handlePress = jest.fn();
    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(
        <ThemeProvider>
          <Button title="Confirm Slot" onPress={handlePress} />
        </ThemeProvider>
      );
    });

    const button = tree?.root.findByProps({ accessibilityLabel: 'Confirm Slot' });
    act(() => {
      button?.props.onPress();
    });

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const handlePress = jest.fn();
    let tree: renderer.ReactTestRenderer | undefined;
    act(() => {
      tree = renderer.create(
        <ThemeProvider>
          <Button title="Submit" disabled onPress={handlePress} />
        </ThemeProvider>
      );
    });

    const button = tree?.root.findByProps({ accessibilityLabel: 'Submit' });
    act(() => {
      button?.props.onPress();
    });

    expect(handlePress).not.toHaveBeenCalled();
  });
});
