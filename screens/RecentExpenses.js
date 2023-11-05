import {useContext} from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../util/date";

function RecentExpanses() {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const today = new Date();
        const sevenDaysAgo = getDateMinusDays(today, 7);
        return expenseDate >= sevenDaysAgo && expenseDate <= today;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod={'Last 7 Days'}
            fallbackText={'No expenses registered for the last 7 days'}/>
    );
}

export default RecentExpanses;