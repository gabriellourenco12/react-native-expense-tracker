import {createContext, useReducer} from 'react';

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {
    },
    addExpense: ({description, amount, date, id}) => {
    },
    updateExpense: (id, {description, amount, date}) => {
    },
    deleteExpense: (id) => {
    },
});

//reducers are functions that take a state and an action as arguments and return a new state
//state is the current state of the application and action is an object that describes what happened
function expensesReducer(state, action) {
    //action send by the dispatch function
    switch (action.type) {
        case 'SET':
            return action.payload.reverse();
        case 'ADD':
            return [action.payload, ...state];
        case 'UPDATE':
            //find the index of the expense to update and update it then return the new state
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatedItem = {...state[updatableExpenseIndex], ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    //useReducer is a hook that returns the current state and a dispatch function
    //the dispatch function is used to dispatch actions to the reducer
    //the second argument is the initial state
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses});
    }

    function addExpense(expenseData) {
        //dispatch is a function that takes an action as an argument and dispatches it to the reducer
        //the action name 'type' will be read by the reducer to determine what to do
        dispatch({type: 'ADD', payload: expenseData});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;