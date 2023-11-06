import axios from "axios";

export function storeExpense(expenseData) {
    axios.post(
        'https://react-native-expense-tra-74f18-default-rtdb.firebaseio.com/expenses.json',
        expenseData
    );
}