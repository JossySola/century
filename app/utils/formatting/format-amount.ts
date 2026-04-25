export function formatAmount (amount: number): string {
    const amountAsString = amount !== null ? amount.toString() : "0";
    const length: number = amountAsString.length;
    let formatedAmount: string = "";
    
    if (length === 4) amountAsString;
    if (length === 5) {
        formatedAmount += amountAsString[0];
        formatedAmount += amountAsString[1];
        formatedAmount += ".";
        formatedAmount += amountAsString[2]
        formatedAmount += "K";
        return formatedAmount;
    }
    if (length === 6) {
        formatedAmount += amountAsString[0];
        formatedAmount += amountAsString[1];
        formatedAmount += amountAsString[2];
        formatedAmount += ".";
        formatedAmount += amountAsString[3];
        formatedAmount += "K";
        return formatedAmount;
    }
    if (length > 6 && length < 10) {
        if (length === 7) {
            formatedAmount += amountAsString[0];
            formatedAmount += ".";
            formatedAmount += amountAsString[1];
            formatedAmount += "M";
            return formatedAmount;
        } else {
            let formatedString = amountAsString.slice(0,-5);
            formatedString += "M";
            return formatedString;
        }
    }
    if (length > 10) {
        let formatedString = amountAsString.slice(0,-9);
            formatedString += "B";
            return formatedString;
    }
    return amountAsString
}