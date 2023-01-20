import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

const BudgetsContext = createContext();

export function useBudgets() {
	return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useState([]);
	const [expenses, setExpenses] = useState([]);

	function getBudgetExpenses(budgetId) {
		return expenses.filter((expense) => expense.budgetId === budgetId);
	}

	function addExpense({ description, amount, budgetId }) {
		setExpenses((prev) => {
			return [...prev, { id: uuid(), description, amount, budgetId }];
		});
	}

	function addBudget({ name, max }) {
		setBudgets((prev) => {
			if (prev.find((budget) => budget.name === name)) {
				return prev;
			}
			return [...prev, { id: uuid(), name, max }];
		});
	}

	function deleteBudget({ id }) {
		setBudgets((prev) => {
			return prev.filter((budget) => budget.id !== id);
		});
	}

	function deleteExpense({ id }) {
		setExpenses((prev) => {
			return prev.filter((budget) => budget.id !== id);
		});
	}

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteBudget,
				deleteExpense,
			}}>
			{children}
		</BudgetsContext.Provider>
	);
};
