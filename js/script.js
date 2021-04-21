const form = document.querySelector('form');
/**
 *  T-shirt elements
 */
const Theme = document.getElementById("design");
const colorOptions = document.getElementById("color");
const JobRole = document.getElementById("title");
/**
 *  Cost elements
 */
const Total_cost = document.getElementById("activities-cost");
const activitiesBox = document.getElementById('activities-box');

//console.log(Total_cost);
//console.log(activitiesBox);

/**
 *  Payment elements
 */
const payment = document.getElementById("payment");
const credit_card = document.getElementById("credit-card");
const paypal  = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

/*console.log(payment);
console.log(credit_card);
console.log(paypal);
console.log(bitcoin);*/

/**
 * Form Validation
 */
const Name = document.getElementById("name")
const Email = document.getElementById("email")
const RegforAct = document.getElementById("activities");
const CardNum = document.getElementById("cc-num");
const ZipCode = document.getElementById("zip");
const CVV = document.getElementById('cvv');
console.log(RegforAct);
console.log(CardNum);
console.log(ZipCode);
console.log(CVV);

/**
 * Default settings When the page loads, 
 */
window.addEventListener('load', () => {

    Name.focus();
    colorOptions.disabled = true;
    document.getElementById("other-job-role").style.visibility = "hidden";
    bitcoin.style.visibility ="hidden";
    paypal.style.visibility="hidden";
    payment.firstElementChild.nextElementSibling.setAttribute('selected','true');
});

/**
 * Only when other job role is selected, that the input text will be visible
 */
JobRole.addEventListener('change', (evt) =>{

    if(evt.target.value === "other"){
        document.getElementById("other-job-role").style.visibility = "visible";
    }else{
        document.getElementById("other-job-role").style.visibility = "hidden";
    }
});

/**˛
 *When theme is selected, only the color opntions for that theme will be visible
 */
Theme.addEventListener('change', (evt) =>{

    let clickedValue = evt.target.value;
    colorOptions.disabled = false;
        for(let i=0; i<colorOptions.length;i++){
            let options = colorOptions[i].getAttribute('data-theme');
            
                if(options === clickedValue){
                    //  colorOptions[i].style.visibility = "visible";
                    colorOptions[i].hidden = false;
                    colorOptions[i].selected = true;
                }else{
                    //  colorOptions[i].style.visibility = "hidden";
                    colorOptions[i].hidden = true;
                    colorOptions[i].selected = false;
                }
            } 

});

let costOfActivities = 0;
activitiesBox.addEventListener('change', (evt) => {

    let data_cost = parseInt( evt.target.getAttribute ("data-cost"));
    //console.log(data_cost, typeof(data_cost));
        if(evt.target.checked){
            costOfActivities += data_cost;
        }else{
            costOfActivities -= data_cost;
        }
    //console.log(costOfActivities);
    Total_cost.innerHTML = `Total: $${costOfActivities}`;
});

payment.addEventListener('change', (evt) => {
    console.log("got here");
    if (evt.target.value === 'paypal') {
        bitcoin.style.visibility ="hidden";
        credit_card.style.visibility ="hidden";
        paypal.style.visibility ="visible";        
    }else if(evt.target.value === 'bitcoin'){
        bitcoin.style.visibility ="visible";
        credit_card.style.visibility ="hidden";
        paypal.style.visibility ="hidden"; 
    }else{
        bitcoin.style.visibility ="hidden";
        credit_card.style.visibility ="visible";
        paypal.style.visibility ="hidden"; 
    }
});

form.addEventListener('submit', (evt)=>{
    let name = /^[a-zA-Z ]{1,30}$/.test(Name.value);
    let email = /^[^@]+@[^@]+\.[a-z]+$/i.test(Email.value);
    //https://stackoverflow.com/questions/9315647/regex-credit-card-number-tests
    //let cardNUm = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(CardNum);
   // let zip = test(ZipCode);
    if(!name || !email || !cardNUm){
        evt.preventDefault();
        alert("smth wrong!!");
    }else{
        alert("All good!");
    }
});

