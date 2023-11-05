import {FlatList, StyleSheet, View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-10-18'),
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-10-25'),
    },
    {
        id: 'e3',
        description: 'Some groceries',
        amount: 5.99,
        date: new Date('2023-10-25'),
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2023-10-26'),
    },
    {
        id: 'e5',
        description: 'A movie ticket',
        amount: 18.59,
        date: new Date('2023-11-02'),
    },{
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-10-18'),
    },
    {
        id: 'e7',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-10-25'),
    },
    {
        id: 'e8',
        description: 'Some groceries',
        amount: 5.99,
        date: new Date('2023-10-25'),
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 14.99,
        date: new Date('2023-10-26'),
    },
    {
        id: 'e10',
        description: 'A movie ticket',
        amount: 18.59,
        date: new Date('2023-11-02'),
    }
]

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});