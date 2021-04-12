window.location.hash = "groceries";

function setup() {

    // Create a new canvas to render our grocery shopping expirience

    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);

    // Dark mode is coo
    background(0);
    fill(255);
    stroke(255);


    // Create a new store and add a few aisles
    
    store = new Store();

    store.addAisle("Dairy");
    store.addAisle("Drinks");
    store.addAisle("Snacks");
    store.addAisle("Frozen");
    store.addAisle("Deli");

    // Set up your new stores inventory

    store.updateInv("Milk", 10, 5, "Dairy", 2);
    store.updateInv("Beers", 20, 20, "Drinks", 3);
    store.updateInv("Chips", 30, 3, "Snacks", 5);
    store.updateInv("Ice Cream", 20, 5, "Frozen", 10);


    inv_item = createInput();
    inv_item.position(10, height-600);

    inv_quantity = createInput("0");
    inv_quantity.position(10, inv_item.y+30);

    price = createInput("0");
    price.position(10, inv_quantity.y+30);
    
    aisle = createInput();
    aisle.position(10, price.y+30);

    section = createInput();
    section.position(10, aisle.y+30);

    add_inv_button = createButton('update');
    add_inv_button.position(30, section.y+30);
    add_inv_button.mousePressed(updateInv);

    // Create a new list of groceries to go shopping for
    // and add items to your new list

    grocery_list = new GroceryList();

    grocery_list.addItem("Ice Cream", 6);
    grocery_list.addItem("Beers", 12);
    grocery_list.addItem("Milk", 1);
    
    item_input = createInput();
    item_input.position(10, 25);

    quantity_input = createInput("1");
    quantity_input.position(10, 55);

    let add_button;
    add_button = createButton('add');
    add_button.position(quantity_input.x + quantity_input.width + 10, item_input.y);
    add_button.mousePressed(addButton);

    let remove_button;
    remove_button = createButton('remove');
    remove_button.position(quantity_input.x + quantity_input.width + 10, quantity_input.y);
    remove_button.mousePressed(removeButton);


    // Create a new shopper who is in the grocery store, list in hand

    shopper = new Shopper(grocery_list.groceries, store);

    shopper.toDo();

}

// resize store if user changes window size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// draw
function draw() {
    background(0);
    text(("To Do: \n\n" + shopper.toDo()), 10, quantity_input.y+50);
    text("Shopping List", 10, 20);
    text("Store Inventory", 10, inv_item.y-10);
    text(store.toString(), 10, add_inv_button.y+50);
    renderStore(store.layout);
}

// add button functionality
function addButton() {
    if (item_input.value() in store.inventory){
        shopper.addItemToList(item_input.value(), quantity_input.value());
    }
}

// add button functionality
function removeButton() {
    shopper.removeItem(item_input.value(), quantity_input.value());
}

// add to inventory button functionality
function updateInv() {
    store.updateInv(inv_item.value(), inv_quantity.value(), price.value(), aisle.value(), section.value())
}

// keyboard controls
function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        shopper.foundItem("Beers");
    }
    if (keyCode == RIGHT_ARROW) {
        shopper.foundItem("Ice Cream");
    }
    if (keyCode == UP_ARROW) {
        renderStore(store.layout);
    }
}

// renders the store to screen, with todo groceries displayed
function renderStore(layout) {
    var i;
    let len = layout.length;
    for (i = 0; i < len+1; i++){
        xpos = (width-100)/(len+1)*i + 250;
        rect(xpos, 10, 10, height-50);
        if (i < len) {text("~ "+layout[i]+" ~", xpos+(width-100)/(len+1)/2 - 5, height/2)}; //render aisles
        for (let item in shopper.unfound_groceries){
            if (store.inventory[item][2] == layout[i] && shopper.unfound_groceries[item]>0){
                text((item + ": " + shopper.unfound_groceries[item] + "\n"), xpos+(width-100)/(len+1)/2-10, store.inventory[item][3]*50)
            }
        }
    }
}