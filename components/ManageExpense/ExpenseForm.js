import {StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDateShort} from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDateShort(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues(prevState => {
            return {
                ...prevState,
                [inputIdentifier]: enteredValue,
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };

        onSubmit(expenseData);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label={'Amount'}
                    textInputProps={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount,
                    }}/>
                <Input
                    style={styles.rowInput}
                    label={'Date'}
                    textInputProps={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date,
                    }}/>
            </View>
            <Input label={'Description'} textInputProps={{
                multiline: true,
                // autoCorrect: true,
                // autoCapitalize: 'sentences', 1 letter in the beginning of the sentence
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description,
            }}/>
            <View style={styles.buttons}>
                <Button style={styles.button} mode={'flat'} onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})