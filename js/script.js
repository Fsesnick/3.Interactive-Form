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

/**
 *  Payment elements
 */
const payment = document.getElementById("payment");
const credit_card = document.getElementById("credit-card");
const paypal  = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
let paymentMethod ='credit-card';

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

/**
 * Default settings When the page loads, 
 */
window.addEventListener('load', () => {

    Name.focus();
    colorOptions.disabled = true;
    document.getElementById("other-job-role").style.visibility = "hidden"; //"Other job role" should be hidden by default
    bitcoin.style.visibility ="hidden";
    paypal.style.visibility="hidden";
    payment.firstElementChild.nextElementSibling.setAttribute('selected','true'); //target the element’s second child element and give it the selected property.
    
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
                    colorOptions[i].hidden = false;
                    colorOptions[i].selected = true;
                }else{
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

/**
 * Payment  listen for the change event
 * to display the <div> element with the id that matches the value of the event.target element.
 * And hide the other two <div> elements.
 */
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

function validationPass(element){
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
    
  }
  
function validationFail(element){
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
    
  }
/* Helper function to validate name input */
const nameValidator = () => {
  
    let nameIsValid =  /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(Name.value);
    if(nameIsValid){
        validationPass(Name);
      }else{
        validationFail(Name);
      }
    
    return nameIsValid;
  }

/* Helper function to validate email input */
const emailValidator = () => {

    let emailIsValid = /^[^@]+@[^@]+\.[a-z]+$/i.test(Email.value);
    if(emailIsValid){
        validationPass(Email);
      }else{
        validationFail(Email);
      }
    
    return emailIsValid;
  }

/* Helper function to validate Register for Activities */
const ActivitiesValidator = () => {
    const ActivitiesIsValid = ActivitiesTotal > 0;
    console.log(`Activities section validation test evaluates to ${ActivitiesIsValid}`);
  
    if(ActivitiesIsValid){
        validationPass(activitiesBox);
      }else{
        validationFail(activitiesBox);
      }
  
  return ActivitiesIsValid;  
}
const creditCardValidator=()=>{

    let cardValid
    let zip = /^\d{5}$/.test(ZipCode.value);  //5 digits
    const cardNUm = /^\d{13,16}$/.test(CardNum.value); //13 to 16 digit
    const cvv = /^\d{3}$/.test(CVV.value);// 3 digits

     if(zip){
        validationPass(ZipCode);
      }else{
        validationFail(ZipCode);
      }
      if(cardNUm){
        validationPass(CardNum);
      }else{
        validationFail(CardNum);
      }
      if(cvv){
        validationPass(CVV);
      }else{
        validationFail(CVV);
      }
}

Name.addEventListener('keyup', nameValidator);
Email.addEventListener('keyup', emailValidator);
activitiesBox.addEventListener('keyup',ActivitiesValidator);

/**
 * Form submission should be prevented if one or more of the required fields or sections is not filled out correctly. 
 */
form.addEventListener('submit', (evt)=>{
   
   // evt.preventDefault();

    if (!nameValidator()) {
      console.log('Invalid name ');
      evt.preventDefault();
    }
  
    if (!emailValidator()) {
      console.log('Invalid email ');
      evt.preventDefault();
    }

    if (!ActivitiesValidator()) {
        console.log('Select an activity');
        evt.preventDefault();
      }
    
    if(paymentMethod === 'credit-card'){
        if (!creditCardValidator()) {
            console.log('Invalid Credit Card Input');
            evt.preventDefault();
        }
    }


});

  /**
   * reference: https://dev.to/microrony/difference-between-classlist-and-classname-45j7
   * "Register for Activities" section in focus
   */
const activitiesCheckbox = document.querySelectorAll('#activities-box input');
//console.log(activitiesCheckbox);
for (let i = 0; i < activitiesCheckbox.length; i++) {
	const input = activitiesCheckbox[i];
	input.addEventListener('focus', () => {
		// "focus" class when element is in focus
		input.parentElement.classList.add('focus');
	});
	input.addEventListener('blur', () => {
		// Remove "focus" class on blur (opposite of focus)
		input.parentElement.classList.remove('focus');
	});
}


