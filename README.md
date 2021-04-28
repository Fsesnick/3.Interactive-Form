# 3.Interactive-Form
 Registration form for a fictional Full Stack conference, including ,among others, the following features:
 1. Validating user input with Regular expression, example:
 ```bash
let nameIsValid =  /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(Name.value);
 let emailIsValid = /^[^@]+@[^@]+\.[a-z]+$/i.test(Email.value);
```
 2. Payment section updates when the user changes the selected payment method in the drop down menu in the:
 ```bash
 payment.addEventListener
 ```
 3. Accessibility, activities with  focus state indicators  and error message, icon and color are displayed on invalid required fields
 ```bash
 function validationPass(element){
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
    
  }
 ```
 4. The total cost of selected activities correctly updates in the form when users select or deselect activities, using addEventListener in the activities-box element.
 ```bash
    let data_cost = parseInt( evt.target.getAttribute ("data-cost"));

    if(evt.target.checked){
            costOfActivities += data_cost;
            ActivitiesTotal++;
        }else{
            costOfActivities -= data_cost;
            ActivitiesTotal--;
        }
    Total_cost.innerHTML = `Total: $${costOfActivities}`;
 ```