/**
 * Form element
 */
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
let paymentMethod ='credit-card';
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
let ActivitiesTotal =0;
/*console.log(RegforAct);
console.log(CardNum);
console.log(ZipCode);
console.log(CVV);*/

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
    //(evt.target.checked) ? ActivitiesTotal++ : ActivitiesTotal--;
      
    if(evt.target.checked){
            costOfActivities += data_cost;
            ActivitiesTotal++;
        }else{
            costOfActivities -= data_cost;
            ActivitiesTotal--;
        }
    //console.log(costOfActivities);
    Total_cost.innerHTML = `Total: $${costOfActivities}`;
});

payment.addEventListener('change', (evt) => {
    paymentMethod = evt.target.value;
    console.log(paymentMethod);
   
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
   
    let name =  /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(Name.value);
    let email = /^[^@]+@[^@]+\.[a-z]+$/i.test(Email.value);
    let activities = ActivitiesValidator(); 
    
    console.log(name,email, activities);

    if(paymentMethod === 'credit-card'){
        let cardValid
        let zip = /^\d{5}$/.test(ZipCode.value);  //5 digits
        const cardNUm = /^\d{13,16}$/.test(CardNum.value); //13 to 16 digit
        const cvv = /^\d{3}$/.test(CVV.value);// 3 digits
        if( zip===false|| cardNUm===false|| cvv===false ){
           cardValid = false;
        }else{
            cardValid = true;
        }
        console.log(zip, cardNUm, cvv, cardValid);
    }

    if(!name || !email || !activities ){
        evt.preventDefault();
        alert("smth wrong!!");
    }else{
        alert("All good!");
    }
});

/* Helper function to validate Register for Activities */
const ActivitiesValidator = () => {
      const ActivitiesIsValid = ActivitiesTotal > 0;
      console.log(`Activities section validation test evaluates to ${ActivitiesIsValid}`);
    
    return ActivitiesIsValid;  
  }

