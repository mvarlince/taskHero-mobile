import { useState } from "react";
import { TextInput, View, Text, StyleSheet, Button, Alert } from "react-native";

export default function AddTask({setTasks}) {
    const [task, setTask] = useState('')

    const handleAddNewTask = () => {
        console.log("handleTask", task)
        const newTask = {
            "done": false,
            "task": task
        }
        fetch(`https://taskhero-api.web.app/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(setTasks)
        .catch(console.error)

        setTask("")
    }
    
    return (
        <>
        <View>
            <TextInput 
                style={styles.input}
                value={task}
                placeholder="enter task"
                onChangeText={setTask} />
            <Button title="Add Task" 
                    onPress={ () => !task
                                ? Alert.alert('Please enter a task') 
                                :  handleAddNewTask()} >
                 </Button>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height:40,
        margin:12,
        borderWidth: 1,
        padding:10,
        borderRadius: 10
    }
})