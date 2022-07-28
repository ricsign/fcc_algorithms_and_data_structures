// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
// cid is a 2D array listing available currency.
// The checkCashRegister() function should always return an object with a status key and a change key.
// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
// Currency Unit	Amount
// Penny	$0.01 (PENNY)
// Nickel	$0.05 (NICKEL)
// Dime	$0.1 (DIME)
// Quarter	$0.25 (QUARTER)
// Dollar	$1 (ONE)
// Five Dollars	$5 (FIVE)
// Ten Dollars	$10 (TEN)
// Twenty Dollars	$20 (TWENTY)
// One-hundred Dollars	$100 (ONE HUNDRED)
// See below for an example of a cash-in-drawer array:
// [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]

function checkCashRegister(price, cash, cid) {
    const words = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"],
        vals = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let diff = cash - price,
        i = words.length - 1,
        changeArray = [],
        equalFlag = true,
        ans = {
            status: null,
            change: []
        };

    for (; i > -1; --i) {
        if (vals[i] > diff) continue;
        if (parseInt(diff) / vals[i] !== parseInt(cid[i][1]) / vals[i]) equalFlag = false;
        let numBills = Math.min(Math.floor(diff / vals[i]), Math.floor(cid[i][1] / vals[i]));
        diff = parseFloat(diff - numBills * vals[i]).toPrecision(7);
        changeArray.push([words[i], numBills * vals[i]]);
    }

    if (parseFloat(diff) !== parseFloat(0)) ans.status = "INSUFFICIENT_FUNDS";
    else if (equalFlag) ans.status = "CLOSED", ans.change = cid;
    else ans.status = "OPEN", ans.change = changeArray;
    return ans;
}