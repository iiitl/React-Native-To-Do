import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Todo = ({ todo, onPress, onCheckboxPress, onDelete }) => {
  return (
    <TouchableOpacity onPress={() => onPress(todo.id)}>
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => onCheckboxPress(todo.id)}>
          <View
            style={[
              styles.checkbox,
              { backgroundColor: todo.completed ? '#A7D397' : 'transparent' },
            ]}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
            {todo.title}
          </Text>
          <Text style={styles.description}>{todo.description}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#535C91',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#E5C287',
  },
  description: {
    marginTop: 8,
    color: 'white',
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#D24545',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default Todo;
