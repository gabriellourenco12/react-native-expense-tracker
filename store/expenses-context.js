import {createContext, useReducer} from 'react';

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


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {
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
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        //dispatch is a function that takes an action as an argument and dispatches it to the reducer
        //the action name 'type' will be read by the reducer to determine what to do
        dispatch({type: 'ADD', payload: expenseData});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData} });
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    return (
        <ExpensesContext.Provider value={null}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;