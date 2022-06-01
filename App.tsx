import { StatusBar } from "expo-status-bar";

import React, { useState }from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ScrollView,
  AppRegistry,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "react-native-btr";
import DashedLine from "react-native-dashed-line";
import AntIcon from "react-native-vector-icons/Feather";
const COLORS = { primary: "#1f145c", white: "#fff" };

const App = () => {
  const [visible, setVisible] = useState(false);
  const [textInput, setTextInput] = React.useState("");
  const [priceInput, setPriceInput] = React.useState("");
  const [todos, setTodos] = React.useState([
    { id: 1, food: "Banana", price: "100" },
    { id: 2, food: "Apple", price: "20" },
  ]);

  const data = Object.keys(setTodos).map(key => ({
  key,
  ...setTodos[key]
}));




  const toggleBottomNavigationView = (todoId) => {
    //Toggling the visibility state of the bottom sheet
    const newTodosItem = todos.filter((item) => item.id != todoId);
    setTodos(newTodosItem);
    setVisible(!visible);
  };

  const deleteTodo = (todoId) => {
    const newTodosItem = todos.filter((item) => item.id != todoId);
    setTodos(newTodosItem);
  };

  const addTodo = () => {
    if (textInput == "" || priceInput == "") {
      Alert.alert("Error", "Please input both food name and price");
    } else {
      const newTodo = {
        id: Math.random(),
        food: textInput,
        price: priceInput,
      };
      setTodos([...todos, newTodo]);
      setTextInput("");
      setPriceInput("");
    }
  };

  const ListItem = ({ todo }) => {
    return (
      <View style={styles.ListItem}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: 8
          }}
        >
        <View style={{flex : 1, flexDirection: "row"}}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            justifyContent: "space-between",
            marginRight: 4,
            color: "grey"
          }}
        >
        ⫶⫶ 
        </Text>
        <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          justifyContent: "space-between",
        }}
      >
      {todo?.food}
      </Text>
      </View>
          <View style={{flex : 1, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              justifyContent: "space-between",
              marginRight: 4,
              color: "grey"
            }}
          >
           Price: 
          </Text>
          <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            justifyContent: "space-between",
          }}
        >
        ₹ {todo?.price}
        </Text>
        </View>
        </View>
        <View
        style = {{
          height: 38,
          width: 0.5,
          backgroundColor: 'black',
          padding: -50,
          marginRight: 3,
        }}
      />

        <TouchableOpacity onPress={() => toggleBottomNavigationView(todo.id)}>
          <View style={styles.actionIcon}>
            <AntIcon name="edit-2" size={16} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete-outline" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        
        backgroundColor: "white",
      }}
    >
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Food List
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 0.5,
          elevation: 30,
        }}
      />
      <View style={{ width: "100%", }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 10 }}
          data={todos}
          renderItem={({ item }) => <ListItem todo={item} />}
        />
      </View>
      <View style={{ padding: "6%" }}>
        <DashedLine dashLength={5} dashColor="grey" />
      </View>
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={toggleBottomNavigationView}
          style={styles.appOpenButtonContainer}
        >
          <Text style={styles.appOpenButtonText}>+ Add Food Item</Text>
        </TouchableOpacity>
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state
          onBackdropPress={toggleBottomNavigationView}
          //Toggling the visibility state
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: -70,
                  marginBottom: -65,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    padding: 20,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Add Food
                </Text>
                <TouchableOpacity onPress={toggleBottomNavigationView}>
                  <View style={styles.closeActionIcon}>
                    <Icon name="close" size={20} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={styles.bottomSheetInputText}>Food Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setTextInput}
                  value={textInput}
                />
                <Text style={styles.bottomSheetInputText}>Food Price</Text>

                <TextInput
                  style={styles.input}
                  onChangeText={setPriceInput}
                  value={priceInput}
                />
                <View style={{}}>
                  <TouchableOpacity
                    onPress={addTodo}
                    style={styles.appSubmitButtonContainer}
                  >
                    <Text style={styles.appButtonText}>Add Food Item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
      <View>
        <TouchableOpacity
        
          onPress={() => Alert.alert("Simple Button pressed")}
          style={styles.appSubmitButtonContainer1}
        >
          <Text style={styles.appButtonText}>Final Food List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 6
  },
  closeActionIcon: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  ListItem: {
   
    backgroundColor: "#C5C6D0",
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 7,
    marginVertical: 10,
    
  },

  container1: {
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },
  

  input: {
    height: 35,
    width: "90%",
    marginLeft: 18,
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 18,
    borderRadius: 8,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  appSubmitButtonContainer1: {
    backgroundColor: "#00A600",
    position: "absolute",
    bottom: -350,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "90%",
    marginLeft: 18,
    marginTop: 6,
  },
  appSubmitButtonContainer: {
    backgroundColor: "#00A600",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "90%",
    marginLeft: 18,
    marginTop: 6,
  },
  appButtonText: {
    fontSize: 13,
    color: "#fff",
    alignSelf: "center",
  },
  bottomSheetInputText: {
    marginLeft: 18,
    marginBottom: 4,
  },
  appOpenButtonContainer: {
    backgroundColor: "#BBFFBB",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "90%",
    borederColor: "#00BB00",
    borderWidth: 0.8,
  },
  appOpenButtonText: {
    fontSize: 15,
    paddingLeft: 15,
    fontWeight: "bold",
  },
});

export default App;
