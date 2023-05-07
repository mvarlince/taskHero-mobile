import { View, Text, StyleSheet, Button, Touchable, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'

export default function TaskCard({data, setTasks}) {

    const handleDelete = () => {
        console.log('delete task')
        fetch(`https://taskhero-api.web.app/tasks/${data.taskId}`,{
            method:"DELETE",
            redirect:"follow"
        })
            .then(res => res.json())
            .then(setTasks)
            .catch(console.error)
    }
    
    return (
        <>
            <View style={styles2.taskCardContainer}>
                <Text style={data.done ? styles2.textColorDone : styles2.textColor}> {data.task} </Text>
                <TouchableWithoutFeedback>
                    <View>
                <Button title="delete" 
                        onPress={() => handleDelete()}
                        style={styles2.deleteBtn}>  </Button>
                </View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles2 = StyleSheet.create({
    taskCardContainer:{
        backgroundColor: '#D3D3D5',
        padding: 20,
        margin: 5,
        borderRadius: 20
    },

    textColor:{
        fontSize:20,
        color: 'black'
    },

    textColorDone:{
        fontSize:20,
        color: '#A0A0A0',
        textDecorationLine:"line-through"
    },
    deleteBtn:{
        flex: 1,  
        flexDirection: "row"  ,
        justifyContent: "flex-end" 
    }
})
