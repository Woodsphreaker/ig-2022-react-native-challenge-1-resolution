import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const randomID = Math.round(Math.random() * 1234567890)
    setTasks([...tasks, {id:randomID,title:newTaskTitle, done: false}])
  }

  function handleToggleTaskDone(id: number) {
    
    setTasks((currentTasks) => {
      const newTasks = currentTasks.map((task) => ({
        ...task,
        done: task.id === id ? !task.done: task.done
      }))
      return newTasks
    })   
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(({id: taskID}) => taskID !== id)
    setTasks(filteredTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})