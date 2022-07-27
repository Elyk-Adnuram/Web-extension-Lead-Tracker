//empty myLeads array
let myLeads = [];
//grabbing the input element from DOM
const inputEl = document.getElementById("input-el");
//grabbing the input button from DOM
const inputBtn = document.getElementById("input-btn");
//grabbing the un-ordered list from DOM
const ulEl = document.getElementById("ul-el");
//grabbing the delete button from DOM
const deleteBtn = document.getElementById("delete-btn");
//getting myLeads from localstorage and parsing it back to an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//grabbing the tab button from DOM
const tabBtn = document.getElementById("tab-btn");

// if conditional that assigns myLeads to leadsFromLocalStorage variable if leadsFromLocalStorage is a truthy value
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//obtain current tab from browser and pushing it to the myLeads array and then set it into localStorage
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

//renders the leads parameter onto the browser extension using innerHTML
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
// clears the localStorage and myLeads array as well as the DOM by calling the render function
deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

//pushes the input from user to the myLeads array and then set the array items to localStorage
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
