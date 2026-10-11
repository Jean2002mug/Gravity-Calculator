interface ScientificNumberProps {
    value: number;
    unit?: string;
}

function ScientificNumber({
    value,
    unit = ""
}: ScientificNumberProps) {

    // Use scientific notation when the number is:
    // 1. Very large
    // 2. Extremely small
    const useScientificNotation =
        Math.abs(value) >= 1_000_000 ||
        (Math.abs(value) > 0 && Math.abs(value) < 0.0001);

    // Normal numbers such as 9.819973 or 5513.2587
    if (!useScientificNotation) {
        return (
            <span>
                {value.toLocaleString(undefined, {
                    maximumFractionDigits: 6
                })}

                {unit && ` ${unit}`}
            </span>
        );
    }

    // Convert something like:
    //
    // 1.980492e+20
    //
    // into two pieces:
    //
    // coefficient = 1.980492
    // exponent = 20
    const [coefficient, exponentText] =
        value.toExponential(5).split("e");

    const exponent = Number(exponentText);

    return (
        <span>
            {coefficient} × 10
            <sup>{exponent}</sup>

            {unit && ` ${unit}`}
        </span>
    );
}

export default ScientificNumber;