import { Transaction } from "../models/transaction";

export class User
{
    displayName ?: String;
    email ?: String;
    _id ?: Number;
    transctions?: Transaction[];


    constructor(){}

}
