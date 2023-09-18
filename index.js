let myLeads = [];

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn");
const savebtn = document.getElementById("save-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//first check if the value is truthy
/*
if(null){
    it will skip this code means if not entered anything then it will be skiped and if some value is enterred before then it will go in this block of code
}
*/

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


deletebtn.addEventListener("click",function(){
    const csvData = convertArrayToCSV(myLeads);
    const filename = "myLeads.csv";
    downloadCSV(csvData, filename);
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})




savebtn.addEventListener("click",function(){

    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){

        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);

    })


    
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "";
    // this is how we store items to the local storage
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads)
    // this is how we get items from local storage
    console.log(localStorage.getItem("myLeads"));
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}



// Function to convert array to CSV format
function convertArrayToCSV(arr) {
    const csv = arr.map(row => row.replace(/,/g, ' ')).join('\n'); // Replace commas in the data if needed
    return csv;
  }
  
  // Function to download the CSV as a file
  function downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  
  