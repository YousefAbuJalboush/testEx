'use strict';

const dataForm = document.getElementById('dataForm');

const setTable = document.getElementById('setTable');
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const arrTitle = [ 'Name' , 'Size' , 'Milk' , 'Is Hot' , 'Drink Type' ];

dataForm.addEventListener('submit', getDataForm );

// let tableExist = false ;


// renderTable();

function getDataForm(event) {
  event.preventDefault();

  console.log(event);
  const order = event.target;

  const name = order.name.value;
  const size = order.size.value;
  const milk = order.milk.value;
  const isHot = order.isHot.checked;
  const drinkType = order.drinkType.value;

  // console.log(JSON.stringify(document.getElementById('table')));
  if( JSON.stringify(document.getElementById('table')) === 'null' ){
    renderTable();
    gettingOrderFromLs();
  }


  // if( ! tableExist ){
  //   renderTable();
  //   gettingOrderFromLs();
  //   tableExist = true ;
  // }

  new Order( name , size , milk , isHot , drinkType );

  setObject();
}


function Order ( name , size , milk , isHot , drinkType ) {
  this.name = name;
  this.size = size;
  this.milk = milk;
  this.isHot = isHot;
  this.drinkType = drinkType;

  Order.setOrder.push(this);

  this.renderContentTbody();
}

Order.setOrder = [] ;

function renderTable () {

  setTable.appendChild(table);
  table.setAttribute('border','2px');
  table.setAttribute('id','table');

  table.appendChild(thead);

  const tr = document.createElement('tr');
  thead.appendChild(tr);

  let th ;

  for (let i = 0; i < arrTitle.length; i++) {

    th = document.createElement('th');
    tr.appendChild(th);
    th.textContent=arrTitle[i];

  }

  table.appendChild(tbody);
}

Order.prototype.renderContentTbody = function () {
  const tr = document.createElement('tr');
  tbody.appendChild(tr);
  let td ;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent=this.name;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent=this.size;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent=this.milk;

  let temp ;
  if(this.isHot === true){
    temp = 'hot';
  } else{
    temp = 'cold';
  }

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent=temp;

  td = document.createElement('td');
  tr.appendChild(td);
  td.textContent=this.drinkType;
};

function setObject(){
  let arrObject = JSON.stringify(Order.setOrder);

  localStorage.setItem('coffeeSaved', arrObject);
}

function gettingOrderFromLs(){

  let arrObject = localStorage.getItem('coffeeSaved');

  let order = JSON.parse(arrObject);

  if(order !== null){
    for (let i = 0; i < order.length; i++) {
      new Order( order[i].name , order[i].size , order[i].milk , order[i].isHot , order[i].drinkType );
    }
  }

}
// gettingOrderFromLs();
