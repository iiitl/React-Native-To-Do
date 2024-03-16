import React from 'react';
import { FlatList, View } from 'react-native';
import Todo from './Todo';

const TodoList = ({ todos, onPress, onCheckboxPress }) => {
  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <Todo todo={item} onPress={onPress} onCheckboxPress={onCheckboxPress} />
        )}
      />
    </View>
  );
};

export default TodoList;
