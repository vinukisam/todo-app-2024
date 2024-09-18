import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TodoList isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <View style={[styles.bottomBar, isDarkMode ? styles.darkBottomBar : styles.lightBottomBar]}>
        <TouchableOpacity 
          style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]} 
          onPress={toggleTheme}
        >
          <Text style={[styles.buttonText, isDarkMode ? styles.darkButtonText : styles.lightButtonText]}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  bottomBar: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  lightBottomBar: {
    backgroundColor: '#f2f2f2',
  },
  darkBottomBar: {
    backgroundColor: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightButton: {
    backgroundColor: '#f2f2f2',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 16,
  },
  lightButtonText: {
    color: '#000',
  },
  darkButtonText: {
    color: '#fff',
  },
});
