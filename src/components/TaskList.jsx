import { useState, useEffect } from "react";
import { ScrollView, Text, ImageBackground, StyleSheet,TouchableOpacity } from "react-native";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

export default function TaskList( ) {
    const [tasks, setTasks] = useState()
    const date = new Date()
    

    console.log(date)

    // fetch stacklist in useEffect (run only once)
    useEffect( () => {        
        // https://todo-jsohndata-api.web.app/tasks
        fetch('https://taskhero-api.web.app/tasks')
        .then(res => res.json())
        .then(setTasks)
        .catch(console.error)
    }, [] )
    
    // function is sending a patch request to update done then returns an updated list
    const toggleDone = (task) => {
        console.log(task.taskId)
        // is task done?
        const done = !!!task.done // true, false, undefined - 3 ! forces value to be a boolean
        // need to send a patch request to `/tasks/${task.taskID}`
        // in the body we need to send {done}
        fetch(`https://taskhero-api.web.app/tasks/${task.taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({done})
        })
        .then(res => res.json())
        .then(setTasks)
        .catch(console.error)
    }

    // return ScrollView with tasklist mapped to TaskCard
    return (
        <ScrollView>
            <Text style={styles.h2}> To Do </Text>
            <Text style={styles.date}> {date.toLocaleDateString()} </Text>

            < AddTask setTasks={setTasks}/>
            <ImageBackground
                source={ require("../assets/todo.jpg") }
                resizeMode="cover"
                style={styles.bg} >
            </ImageBackground> 

            {!tasks
                ? <Text> Loading... </Text>
                : tasks.map( (element) => {
                    return (
                        <TouchableOpacity 
                            onPress={() => toggleDone(element)}>
                                <TaskCard 
                                    key={element.tasksID} 
                                    data={element}
                                    task={tasks}
                                    setTasks={setTasks}
                                /> 
                        </TouchableOpacity>)
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bg:{
        flex:1,
        justifyContent:'center'
    },
    h2:{
        fontSize: 20,
        fontWeight: "700",
        display: "flex",
        textAlign: 'center'
    },
    date:{
        textAlign: 'center'
    }
})