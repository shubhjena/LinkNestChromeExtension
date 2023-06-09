let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("form-el");

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  //  ulEl.innerHTML += "<li>"+inputEl.value+ "</li>"
  inputEl.value = "";
  renderLead();
});

function renderLead() {
  let listItem = "";

  for (let i = 0; i < myLeads.length; i++) {
    listItem +=
    `
        <input type="checkbox">
            <label>
                <a  target='_blank' href='${myLeads[i]}'> 
                    ${myLeads[i]} 
                </a>
            </lable>
        <br>
    `
  }

  ulEl.innerHTML = listItem;
}
