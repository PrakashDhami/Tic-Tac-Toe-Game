let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn =  document.querySelector("#new-game");
let msgContainer =  document.querySelector(".msg-container");
let msg =  document.querySelector("#message");
turnO = true;
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


// ACCESSING ALL BOXES AND ADDING LISTNER TO THE BOXES

let count=0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box is clicked");
        if (turnO) {
            currentPlayer = "O";
            box.innerText = currentPlayer;
            box.style.color = currentPlayer === 'X' ? 'blue' : 'green';
            turnO = false;
        } else {
            currentPlayer = "X";
            box.innerText = currentPlayer;
            box.style.color = currentPlayer === 'X' ? 'blue' : 'green';
            turnO = true;
        }
        box.disabled = true;
        count++;
        console.log(count);
        
        if (!checkWinner()) { // Assuming checkWinner returns true if there's a winner
            // Check for draw condition
            if (count === 9) {
                draw();
                // console.log("Draw!"); // Print draw message to the console
                // alert("It's a draw!");
                count =0; // Optional: display an alert for the user
                // You can also disable further clicks or reset the game here
            }
        }

        
    })
});




// CHECKING WINNER

const checkWinner = () => {
    for (patterns of winPattern) {
            let val1 = boxes[patterns[0]].innerText; 
            let val2 =boxes[patterns[1]].innerText;
            let val3 =boxes[patterns[2]].innerText;
           
            if(val1 != "" && val2 != "" && val3 != ""){
                if(val1 === val2 && val2 === val3 ){
                    console.log("Winner is ",val1);
                    showWinner(val1);
                }
            }
        
    }
}

// draw condition

const draw = () =>{
    msg.innerText = "Game Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// showing winner in the list

const showWinner = (winner) =>{
    msg.innerText = `Congratullation winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// disabling all the boxes after winning 
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

// disabling all the boxes after winning 
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

// use of reset button

const reset = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}

// clicking of new button and reset button

newBtn.addEventListener("click",reset);
resetBtn.addEventListener("click",reset);