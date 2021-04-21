const Theme = document.getElementById("design");
const colorOptions = document.getElementById("color");
const JobRole = document.getElementById("title");

//const Designs = document.querySelectorAll('.shirt-designs');

/**
 * When the page loads, name has the focus, colors are disabled and other job role is hidden
 */
//window.addEventListener('load', () => {

    document.getElementById("name").focus();
    colorOptions.disabled = true;
    document.getElementById("other-job-role").style.visibility = "hidden";

//});
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
  //  console.log(clickedValue);
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

