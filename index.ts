#! /usr/bin/env node
import inquirer from "inquirer"
//Bank Account Interface
interface BankAccount{
    accountNumber :number;
    balance:number;
    withdraw (amount:number): void
    Deposit (amount:number): void
    CheckBalance(): void

}
// Bank Account Class
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance
}
    //Debit Money
withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficent Balance");
            
}
    }
    //Credit Money
    Deposit(amount: number): void {
        if(amount > 100){
            amount -= 1; // $ 1 fee charged if more than $100 is deposited
} this.balance += amount;
        console.log(`Deposit of $${amount} Successfull. balance: $${this.balance}`);
        
}
    // check balance 
    CheckBalance(): void {
        console.log(`Current Balance:  $${this.balance}`);
}
}
  // costumer class 
  class custumer {
    firstName : string;
    lastName : string;
    gender: string;
    age: number;
    mobileNumber: number;
    account :BankAccount

constructor(firstName: string,lastName:string,gender:string,age: number,mobileNumber:number,account:BankAccount){
    this.firstName = firstName;
    this.lastName  = lastName;
    this.gender    = gender;
    this.age       = age;
    this.mobileNumber = mobileNumber;
    this.account = account
}
  }

// create bank account
const accounts :BankAccount[] =[
    new BankAccount (1001 , 500),
    new BankAccount (1002 , 100),
    new BankAccount (1003 , 2000)
];
// create costumer 
const custumers : custumer[] =[
 new custumer ("Alveena","Waqar","Female",25,3456536,accounts[0]),
 new custumer ("Kinza","Waqar","Female",12,32256536,accounts[1]),
 new custumer ("Irtiza","Waqar","male",22,3356536,accounts[2])
];
// function to interact with bank account
async function service() {
    do {
 const accountNumberInput = await inquirer.prompt({
            name : "accountNumber",
            type: "number",
            message:"Enter your account number:"
 }
);
const custumer = custumers.find(custumer=> custumer.account.accountNumber === accountNumberInput.accountNumber) 
 if (custumer){
             console.log(`wellcome, ${custumer.firstName} ${custumer.lastName} !\n `);
 const ans = await inquirer.prompt([{
        name:"select",
        type:"list",
        message:"select an operation",
        choices:["Deposit","Withdraw","checkBalance","Exit"]
}
]);
    switch (ans.select) {
        case "Deposit" :
const DepositAmount = await inquirer.prompt({
                name:"amount",
                type:"number",
                message:"Enter the amount of deposit"
}
)
 custumer.account.Deposit(DepositAmount.amount)
    break;
    case "Withdraw" :
        const withdrawAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Enter the amount of withdraw"
}
);
custumer.account.withdraw(withdrawAmount.amount)
    break ;
    case "checkBalance"  : 
        custumer.account.CheckBalance () ;       
    break ;
    case "Exit":
                  console.log("Exiting bank program...");
                  console.log("\n Thank you for using our bank services.have a great day\n ");
    return      
}
 } 
   else {
           console.log("Invalid accountnumber. please try again"); 
 }
} 
     while (true);
}
service()