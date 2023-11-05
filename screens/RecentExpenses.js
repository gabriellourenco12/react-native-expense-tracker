import {Text, View} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpanses() {
    return (
        <ExpensesOutput expensesPeriod={'Last 7 Days'}/>
    );
}

export default RecentExpanses;