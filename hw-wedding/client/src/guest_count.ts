import { Guest } from "./guest";


/** 
* Returns a string with the range of the intended value
* @param array is the array of guests
* @param from is the side of the family you want
* @returns string "%x-%y" x is the integers of certain, y is the max integer
*/
export const count = (array:ReadonlyArray<Guest>,from:"Molly"|"James"): string => {
    const min:number=recursiveCount(0,array,from,true);
    const max:number=recursiveCount(0,array,from,false);
    if(min===max){
        return min.toString();
    }else{
        return min.toString() +"-"+max.toString();
    }
};
/** 
 * export is only for testing!
* goes through array and counts all the guest that are from a side (can differentiate whether certain or uncertain to get range)
* returns 0 if index is out of range and terminates
* @param array is the array of guests
* @param index is the index we are on in the array
* @param from is the side of family you want
* @param min represents whether you are recieving min or max, true if min
* @throws Error if guestOf is undefined
* @returns a number which represents the count.
*/
export const recursiveCount = (index:number,array:ReadonlyArray<Guest>,from:"Molly"|"James",min:boolean): number => {
if(index>=array.length){
    return 0;
}else{
    if(array[index].guestOf.from===from){
        //if they are bringing one person or (certain is false and it is unknown if they will bring someone)
        if(array[index].bringingSomeone==='1'||(!min&&array[index].bringingSomeone==='unknown')){
            return 1+1+ recursiveCount(index+1,array,from,min);
        }else{
        return 1+ recursiveCount(index+1,array,from,min);
    }
    }else{
        if(array[index].guestOf.from===undefined){
            throw new Error('array guestOf is undefined which should be impossible')
        }
        return 0+ recursiveCount(index+1,array,from,min);
    }
}
}

/** 
* Returns a string representation of the number who are family
* @param array is the array of guests
* @returns string "%x" x is the count of guests who are family
*/
export const count_fam = (array:ReadonlyArray<Guest>,from:"Molly"|"James"): string => {
    return recursiveFam(0,array,from).toString();
};
/** 
 * export is only for testing!
* goes through array and counts all the guests who are family
* returns 0 if index is out of range and terminates
* ignores when guestof is undefined 
* @param array is the array of guests
* @param index is the index we are on in the array
* @returns a number which represents the count.
*/
export const recursiveFam = (index:number,array:ReadonlyArray<Guest>,from:"Molly"|"James"): number => {
if(index>=array.length){
    return 0;
}else{
    if(array[index].family&&array[index].guestOf.from===from){
        return 1+ recursiveFam(index+1,array,from);
    }
    else{
        return 0+ recursiveFam(index+1,array,from);
    }
}

};
