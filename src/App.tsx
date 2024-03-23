import { useNetToYearlyGrossCalculator } from "./hooks/netToGrossCalculatorHook";
import { FormEvent, useState } from "react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "RSD",
  }).format(value);

function App() {
  const [yearlyGrossSalary, setYearlyGrossSalary] = useState("");
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState("");
  const { calculateNetToYearlyGross } = useNetToYearlyGrossCalculator();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const netSalary = parseFloat(
      // @ts-expect-error "e" needs proper type
      e.currentTarget.elements.namedItem("netSalary")?.value || 0,
    );

    const grosSalaries = calculateNetToYearlyGross(netSalary);
    const monthlyGross = formatCurrency(grosSalaries.monthlyGross);
    const yearlyGross = formatCurrency(grosSalaries.yearlyGross);

    setMonthlyGrossSalary(monthlyGross);
    setYearlyGrossSalary(yearlyGross);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <label>Net salary in RSD (without , .) </label>
          <input type="number" name="netSalary" />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
      <div>
        <span>Month gross salary: </span>
        <span>{monthlyGrossSalary}</span>
        <hr />
        <span>Year gross salary: </span>
        <span>{yearlyGrossSalary}</span>
      </div>
    </div>
  );
}

export default App;
