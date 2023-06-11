let myLeads = []; //stores the list of links entered

//all HTML DOM variables
const inputBtn = document.getElementById("input-btn");
const clearBtn = document.getElementById("clear-btn");
const TabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("form-el");

//fetch from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//render function to update the DOM
function render(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    listItem += `
        <input type="checkbox">
            <label>
                <a  target='_blank' href='${leads[i].url}'> 
                    ${leads[i].title} 
                </a>
            </lable>
        <br>
    `;
  }
  ulEl.innerHTML = listItem;
}

//Add Link button: adds the text entered in input box to list
inputBtn.addEventListener("click", function () {
  myLeads.push({ "url": inputEl.value, "title": inputEl.value });
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//Press enter to add text entered in input box
inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    inputBtn.click();
  }
});

//ClearList button: clears localStorage, myLeads & DOM
clearBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

//Add Tab button: adds the link of active tab to the list
TabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push({ "url": tabs[0].url, "title": tabs[0].title });
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});