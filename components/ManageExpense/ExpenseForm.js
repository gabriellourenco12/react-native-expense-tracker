import {Alert, StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDateShort} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDateShort(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs(prevState => {
            return {
                ...prevState,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = !isNaN(expenseData.date.getTime());
        const dateIsNotFuture = expenseData.date.getTime() <= new Date().getTime();
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !dateIsNotFuture || !descriptionIsValid) {
            setInputs(prevState => {
                return {
                    amount: {value: prevState.amount.value, isValid: amountIsValid},
                    date: {value: prevState.date.value, isValid: dateIsValid && dateIsNotFuture},
                    description: {value: prevState.description.value, isValid: descriptionIsValid},
                }
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label={'Amount'}
                    invalid={!inputs.amount.isValid}
                    textInputProps={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}/>
                <Input
                    style={styles.rowInput}
                    label={'Date'}
                    invalid={!inputs.date.isValid}
                    textInputProps={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }}/>
            </View>
            <Input label={'Description'} invalid={!inputs.description.isValid} textInputProps={{
                multiline: true,
                // autoCorrect: true,
                // autoCapitalize: 'sentences', 1 letter in the beginning of the sentence
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}/>

            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your inputs</Text>}

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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
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