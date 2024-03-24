const LOWEST_GROSS_BASE = 40143;
const HIGHEST_GROSS_BASE = 573470;

const LOWEST_NET_BASE = 40255;
const HIGHEST_NET_BASE = 404502;

const NET_SALARY_RELIEF = 2500;
const TAX_DEDUCTION_COEFFICIENT = 0.199;
const YEAR_MULTIPLIER = 12;

export const useNetToYearlyGrossCalculator = () => {
  const calculateNetToYearlyGross = (
    netSalary: number,
  ): { monthlyGross: number; yearlyGross: number } => {
    // 1. Net salary lower then lowest net limit defined by country
    if (netSalary < LOWEST_NET_BASE) {
      const tier1Gross =
        (netSalary -
          NET_SALARY_RELIEF +
          LOWEST_GROSS_BASE * TAX_DEDUCTION_COEFFICIENT) /
        0.9;

      return {
        monthlyGross: tier1Gross,
        yearlyGross: tier1Gross * YEAR_MULTIPLIER,
      };
    }

    // 2. Net salary between lowest and highest net limit defined by country
    if (netSalary > LOWEST_NET_BASE && netSalary < HIGHEST_NET_BASE) {
      const tier2Gross = (netSalary - NET_SALARY_RELIEF) / 0.701;

      return {
        monthlyGross: tier2Gross,
        yearlyGross: tier2Gross * YEAR_MULTIPLIER,
      };
    }

    // 3. Net salary higher then highest net limit defined by country
    if (netSalary > HIGHEST_NET_BASE) {
      const tier3Gross =
        (netSalary -
          NET_SALARY_RELIEF +
          HIGHEST_GROSS_BASE * TAX_DEDUCTION_COEFFICIENT) /
        0.9;

      return {
        monthlyGross: tier3Gross,
        yearlyGross: tier3Gross * YEAR_MULTIPLIER,
      };
    }

    return {
      monthlyGross: 0,
      yearlyGross: 0,
    };
  };

  return {
    calculateNetToYearlyGross,
  };
};
