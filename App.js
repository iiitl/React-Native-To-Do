import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const staticTodos = [
    { id: 1, title: "Sample Todo 1", description: "Description 1", completed: false },
    { id: 2, title: "Sample Todo 2", description: "Description 2", completed: false },
    { id: 3, title: "Sample Todo 3", description: "Description 3", completed: true },
  ];

  useState(() => {
    setTodos(staticTodos);
  }, []);

  const addTodo = () => {
    if (title && description) {
      const newTodo = {
        id: todos.length + 1,
        title,
        description,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTitle("");
      setDescription("");
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const onDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filterTodos = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "nonCompleted") return !todo.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <Text style={styles.heading}>Add Todo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button title="Add Todo" onPress={addTodo} />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => filterTodos("all")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "completed" && styles.activeFilter,
          ]}
          onPress={() => filterTodos("completed")}
        >
          <Text>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "nonCompleted" && styles.activeFilter,
          ]}
          onPress={() => filterTodos("nonCompleted")}
        >
          <Text>Non Completed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.heading}>Todos</Text>
        <TodoList
          todos={filteredTodos}
          onPress={toggleTodo}
          onDelete={onDelete}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeFilter: {
    backgroundColor: "#ddd",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default App;
