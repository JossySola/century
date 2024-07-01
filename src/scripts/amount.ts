export default function formatAmount (amount: string): string {
    amount = amount.toString();
    const length: number = amount.length;
    let formatedAmount: string = "";
    
    if (length === 4) amount;
    if (length === 5) {
        formatedAmount += amount[0];
        formatedAmount += amount[1];
        formatedAmount += ".";
        formatedAmount += amount[2]
        formatedAmount += "K";
        return formatedAmount;
    }
    if (length === 6) {
        formatedAmount += amount[0];
        formatedAmount += amount[1];
        formatedAmount += amount[2];
        formatedAmount += ".";
        formatedAmount += amount[3];
        formatedAmount += "K";
        return formatedAmount;
    }
    if (length > 6 && length < 10) {
        if (length === 7) {
            formatedAmount += amount[0];
            formatedAmount += ".";
            formatedAmount += amount[1];
            formatedAmount += "M";
            return formatedAmount;
        } else {
            let formatedString = amount.slice(0,-5);
            formatedString += "M";
            return formatedString;
        }
    }
    if (length > 10) {
        let formatedString = amount.slice(0,-9);
            formatedString += "B";
            return formatedString;
    }
    return amount
}