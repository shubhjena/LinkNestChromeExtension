let myLeads = []; //stores the list of links entered

//all HTML DOM variables
const inputBtn = document.getElementById("input-btn");
const clearBtn = document.getElementById("clear-btn");
const tabBtn = document.getElementById("tab-btn");
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
      <li>
        <input type="checkbox" id="item checkbox-${i}">
        <label for="checkbox-${i}" class="${leads[i].checked ? 'completed' : ''}">
                <a  target='_blank' href='${leads[i].url}'> 
                    ${leads[i].title} 
                </a>
            </label>
            <button class="delete-btn" data-index="${i}">Remove</button>
        </li>
    `;
  }
  ulEl.innerHTML = listItem;
  attachCheckboxHandlers();
  attachDeleteHandlers();
}

//Add Link button: adds the text entered in input box to list
inputBtn.addEventListener("click", function () {
  if(inputEl.value){
    myLeads.push({ "url": inputEl.value, "title": inputEl.value });
  }
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
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push({ "url": tabs[0].url, "title": tabs[0].title });
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// Attach event handlers to checkboxes
function attachCheckboxHandlers() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", function () {
      myLeads[index].checked = this.checked;
      moveCheckedItemsToBottom();
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    });

    // Initialize checkbox state based on the myLeads data
    checkbox.checked = myLeads[index].checked;
  });
}

// Attach event handlers to delete buttons
function attachDeleteHandlers() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      myLeads.splice(index, 1);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    });
  });
}

// Function to reorganize the myLeads array by moving checked items to the bottom
function moveCheckedItemsToBottom() {
  myLeads.sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? 1 : -1));
}