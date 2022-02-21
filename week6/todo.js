const display = document.querySelector('.display');
const addt = document.querySelector('.add');
const form = document.querySelector('.form');

var list = [];

form.addEventListener('submit', function(event){
    event.preventDefault();
    addToList(addt.value)
});

function addToList(item){
if (item !== ''){
    const todo = { id : Date.now(), content: item, completed: false };  
    list.push(todo);
   addToLocal(list);
   addt.value = '';
}
}

function addToLocal(list){
    localStorage.setItem('list', JSON.stringify(list));
    displayList(list);
}

function getLocal(){
    const reference = localStorage.getItem('list');
    if (reference){
        list = JSON.parse(reference);
        displayList(list);
    }
}
function toggle(id) {
    list.forEach(function(item) {
       if (item.id == id) {
         item.completed = !item.completed;
      }
    });
  
    addToLocal(list);
  }

function remove(id){
    list = list.filter(function(item) {
        return item.id != id;
     });
   
      addToLocal(list);
   };


function displayList(list){
    display.innerHTML = '';

    list.forEach(function(item) {
        const li = document.createElement('li');
        let checked = '';
        if(item.completed === true){
            checked = 'checked'
        }
        li.setAttribute('key', item.id);
        li.innerHTML = '<input type="checkbox"' + item.completed + ' ' + checked + '>' + item.content + '<button id="remove">Remove Task</button>';
        display.append(li);
    });
    getCount(list);
}
display.addEventListener('click', function(event){
    if(event.target.id === 'remove'){
        remove(event.target.parentElement.getAttribute('key'));
    }
    if(event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('key'));
    }
})
getLocal();
function getCount(list){
    const message = document.getElementById('message');
    if (list == null){
        message.innerHTML = '0 tasks';
    }
    else {
        message.innerHTML = list.length + " tasks";
    }
}

function getActive(list){
    const message = document.getElementById('message');
    active = 0;
    list.forEach(function(item){
        if (item.completed != true){
            active++;
            message.innerHTML = active + " active tasks";
        }
        if (active == 0){
            message.innerHTML =  `0 active tasks`;
              }

    });
}
function getCompleted(list){
    const message = document.getElementById('message');
    comp=0;
    list.forEach(function(item) {
      if (item.completed == true){
        comp++;
        message.innerHTML = comp + ` completed`;
      } 
      if (comp == 0){
        message.innerHTML =  `0 completed`;
          }
    });
 }