import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TodoList from "./components/TodoList";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);


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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container2}>
        <View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.titles}>Todo App</Text>
        </View>
        
        <Text style={styles.heading}>Add Todo</Text>
        <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#9290C3" // Add placeholder text color
        value={title}
        onChangeText={(text) => setTitle(text)}
/>
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor='#9290C3'
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addTodo}
          >
          <Text style={styles.buttonText}>Add Todo</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === "all" && styles.activeFilter]}
            onPress={() => filterTodos("all")}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "completed" && styles.activeFilter,
            ]}
            onPress={() => filterTodos("completed")}
          >
            <Text style={styles.filterText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "nonCompleted" && styles.activeFilter,
            ]}
            onPress={() => filterTodos("nonCompleted")}
          >
            <Text style={styles.filterText}>Non Completed</Text>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // titleContainer: {
  //   height:100,
  //   borderRadius: 10,
  //   padding: 20,
  //   color: 'white' ,
  // },

  titles: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: 'white', // Change text color to white
  },
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2D3250',
    
  },
  container2: {
    flex: 1,
    padding:0,
    
  },
  inputContainer: {
    marginBottom: 16,
    
  },
  input: {
    color: 'white',
    height: 40,
    borderColor: "#424769",

    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    
    
  },

  heading: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#F6B17A',
  },

  filterContainer: {
    
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },

  filterButton: {
    color:'white',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  filterText:{
    color:'gray',
    fontWeight: 'bold',
  },

  activeFilter: {
    backgroundColor: "#ddd",
  }
,
  addButton:{
    backgroundColor:'#9290C3',
    height: 30,
    borderRadius:8,
    textAlign: 'center',
  },

  buttonText:{
    textAlign: "center",
    fontSize: 16,
    padding:4,
  }
  
});

export default App;
