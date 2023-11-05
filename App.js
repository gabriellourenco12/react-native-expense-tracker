import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";

import ManageExpanse from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpanses from "./screens/RecentExpenses";
import {GlobalStyles} from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator screenOptions={({navigation}) => ({
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white',
            tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({tintColor}) => (
                <IconButton
                    icon={'add'}
                    size={24}
                    color={tintColor}
                    onPress={() => {
                        navigation.navigate('ManageExpense');
                    }}/>
            )
        })}>
            <BottomTab.Screen
                name={"RecentExpenses"}
                component={RecentExpanses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="hourglass" color={color} size={size}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name={"AllExpenses"}
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="calendar" color={color} size={size}/>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style={"light"}/>
            <ExpensesContextProvider>
                <NavigationContainer children={null}>
                    <Stack.Navigator
                        initialRouteName={"Home"}
                        screenOptions={{
                            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                            headerTintColor: 'white',
                        }}
                    >
                        <Stack.Screen
                            name={"Home"}
                            component={BottomTabNavigator}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name={"ManageExpense"}
                            component={ManageExpanse}
                            options={{
                                presentation: 'modal',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
