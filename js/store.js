//----------------------------------------
//               STORE
// ----------------------------------------

class Store {

    constructor(){
        this.layout = [];
        this.inventory = {};
    }

    updateInv(item, quantity, price, aisle, section) {
        if (!(item in this.inventory && item != "")) {
            this.inventory[item] = [int(quantity), int(price), aisle, section];
        } else{
            if (price > 0){
               this.inventory[item][1] = price;
           }
             if (aisle != ""){
               this.inventory[item][2] = aisle;
          }
           if (section != ""){
               this.inventory[item][3] = section;
           }
           if (quantity != 0){
           this.inventory[item][0] += quantity;
           }
    }
}

    updateItemPrice(item, price) {
        if (item in this.inventory) {
        this.inventory.item[1] = price;
        };
    }

    updateItemLocation(item, location) {
        if (item in this.inventory) {
        this.inventory.item[2] = location;
        };
    }

    addAisle(name) {
        this.layout.push(name);
    }

    toString() {
        let usetext = "";
        for (let item in this.inventory){
            usetext += (item + ": quantity: "+this.inventory[item][0] + ", price: "+this.inventory[item][1] + "\n\t\t\t\taisle: "+this.inventory[item][2] + ", section: "+this.inventory[item][3]+"\n\n")
        }
        return usetext;
    }
  
};


class GroceryList {

    constructor(){
        this.groceries = [];
    }

    addItem(item, quantity) {
        if (!(item in this.groceries)) {
            this.groceries[item] = quantity;
        } else {
            this.groceries[item] += quantity;
        }
    }

    removeItem(item, quantity) {
        if (item in this.groceries) {
            this.groceries[item] -= quantity;
        };
        if (this.groceries[item].quantity <= 0) {
            this.groceries.splice(this.groceries.indexOf(item),1);
        }
    }
      
}

class Shopper {

    constructor(groceries, store){
        this.unfound_groceries = {};
        this.copy(groceries);
        this.found_groceries = {};
        this.store = store;
        this.todo = "";
    }

    foundItem(item) {
        this.found_groceries[item] = this.unfound_groceries[item];
        delete this.unfound_groceries[item];
    }

    removeItem(item, quantity) {
        if (item in this.unfound_groceries) {
            this.unfound_groceries[item] -= int(quantity);
        } else {
            try{
            this.found_groceries[item] -= int(quantity);
            }
            catch {
                return "This item was not in your list!"
            }
        }
    }
    
    addItemToList(item, quantity) {
        if (item in this.unfound_groceries) {
        this.unfound_groceries[item] += int(quantity);
        } else {
            this.unfound_groceries[item] = int(quantity);
        }
    }

    toDo() {
        this.todo = "";
        for (var item in this.unfound_groceries) {
            if (this.todo.length > 0){this.todo = this.todo.concat(",\n",item)}
            else {this.todo = this.todo.concat(item) }
        }
        return this.todo;
    }

    copy(groceries) {
        for (let item in groceries) {
          this.unfound_groceries[item] = groceries[item]; // copies each property to the objCopy object
        }
      }  
}
