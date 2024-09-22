import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TodoItem({ task, deleteTask, toggleCompleted, editTask, isDarkMode }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to save the edited task
  const handleSaveEdit = () => {
    editTask(updatedTask);
    setEditModalVisible(false);
  };

  return (
    <View style={[styles.todoItem, isDarkMode ? styles.darkTodoItem : styles.lightTodoItem]}>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
        tintColors={{ true: isDarkMode ? '#7CFC00' : '#4CAF50', false: isDarkMode ? '#bbb' : '#ccc' }}
      />
      <View style={styles.taskTextContainer}>
        <Text style={[styles.todoItemText, task.completed && styles.completed, isDarkMode ? styles.darkText : styles.lightText]}>
          {task.title}
        </Text>
        <Text style={[styles.descriptionText, isDarkMode ? styles.darkText : styles.lightText]}>
          {task.description}
        </Text>
        <Text style={[styles.dateText, isDarkMode ? styles.darkText : styles.lightText]}>
          {task.date.toDateString()} {task.date.toLocaleTimeString()}
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Edit Task</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Title"
            value={updatedTask.title}
            onChangeText={text => setUpdatedTask({ ...updatedTask, title: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            value={updatedTask.description}
            onChangeText={text => setUpdatedTask({ ...updatedTask, description: text })}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>Pick Date and Time</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={updatedTask.date}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                setUpdatedTask({ ...updatedTask, date: selectedDate || updatedTask.date });
              }}
            />
          )}

          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="#FF6347" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  lightTodoItem: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  darkTodoItem: {
    backgroundColor: '#555',
    borderColor: '#444',
  },
  taskTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  todoItemText: {
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#999',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#ddd',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  editButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#1c2841',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 30,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  datePickerText: {
    color: '#333',
  },
});
