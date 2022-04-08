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
    const todo = { id : Date.now(), content: item};  
    list.push(todo);
   addToLocal(list);
   addt.value = '';
}
}

function addToLocal(list){
    localStorage.setItem('list', JSON.stringify(list));
    displayList(list);
    displayTaskDrop(list);
}

function getLocal(){
    const reference = localStorage.getItem('list');
    if (reference){
        list = JSON.parse(reference);
        displayList(list);
        displayTaskDrop(list);
    }
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
        
        li.setAttribute('key', item.id);
        li.innerHTML = item.content + '<button id="remove">Remove Task</button>';
        display.append(li);
    });
    
}
display.addEventListener('click', function(event){
    if(event.target.id === 'remove'){
        remove(event.target.parentElement.getAttribute('key'));
    }
})
getLocal();


 const displayTeam = document.querySelector('.display-team');
 const addTeam = document.querySelector('.add-team');
 const teamForm = document.querySelector('.form-team');
 
 
 var team = [];
 
 teamForm.addEventListener('submit', function(event){
     event.preventDefault();
     addToTeam(addTeam.value);
 
 });
 
 function addToTeam(member){
 if (member !== ''){
     const person = { id : Date.now(), content: member};  
     team.push(person);
    addToLocalTeam(team);
    addTeam.value = '';
 }
 }
 
 function addToLocalTeam(team){
     localStorage.setItem('team', JSON.stringify(team));
     displayTeamList(team);
     displayTeamDrop(team);
 }
 
 function getLocalTeam(){
     const reference = localStorage.getItem('team');
     if (reference){
         team = JSON.parse(reference);
         displayTeamList(team);
         displayTeamDrop(team);
     }
 }

 
 function removeTeam(id){
     team = team.filter(function(member) {
         return member.id != id;
      });
    
       addToLocalTeam(team);
    };
 
 
 function displayTeamList(team){
     displayTeam.innerHTML = '';
 
     team.forEach(function(member) {
         const li = document.createElement('li');
         li.setAttribute('key', member.id);
         li.innerHTML = member.content + '<button id="remove-member">Remove Memeber</button>';
         displayTeam.append(li);
     });
     
 }
 displayTeam.addEventListener('click', function(event){
     if(event.target.id === 'remove-member'){
         removeTeam(event.target.parentElement.getAttribute('key'));
     }
 })
 getLocalTeam();
 

 function displayTeamDrop(team){
     teamDrop.innerHTML = '<option value="">Select Member</option>';

     team.forEach(function(member){
         const option = document.createElement('option');
         option.setAttribute('value', member.content);
         option.innerHTML = member.content;
         teamDrop.append(option);

     })

 };
 

 function displayTaskDrop(list){
    taskDrop.innerHTML = '<option value="">Select Task</option>';

    list.forEach(function(item){
        const option = document.createElement('option');
        option.setAttribute('value', item.content);
        option.innerHTML = item.content;
        taskDrop.append(option);

    })

};
const displayAssignments = document.querySelector('.display-assign');
const assignForm = document.querySelector('.form-assign');
const dropName = document.querySelector('#teamDrop')
const dropTask = document.querySelector('#taskDrop')


var assign = [];
assignForm.addEventListener('submit', function(event){
    event.preventDefault();
    addToAssign(dropName.value, dropTask.value);

});

function addToAssign(name, task){
    if (name && task !== ''){
        const assignment = { id : Date.now(), name: name, task: task, completed: false };  
        assign.push(assignment);
       addToLocalAssign(assign);
       
    }

};

function addToLocalAssign(thing){
    localStorage.setItem('assign', JSON.stringify(thing));
    displayAssign(thing);
    
}

function getLocalAssign(){
    const reference = localStorage.getItem('assign');
    if (reference){
        assign = JSON.parse(reference);
        displayAssign(assign);
        
    }
}
function removeAssign(id){
    assign = assign.filter(function(item) {
        return item.id != id;
     });
   
      addToLocalAssign(assign);
   };

   function toggleAssign(id) {
    assign.forEach(function(member) {
       if (member.id == id) {
         member.completed = !member.completed;
      }
    });
  
    addToLocalAssign(assign);
  }

function displayAssign(thing){
    displayAssignments.innerHTML = '';

    thing.forEach(function(wawa) {
        const li = document.createElement('li');
        let checked = '';
        if(wawa.completed === true){
            checked = 'checked'
        }
        li.setAttribute('name', wawa.name);
        li.setAttribute('task', wawa.task);
        li.setAttribute('key', wawa.id);
        li.innerHTML = '<input type="checkbox"' + wawa.completed + ' ' + checked + '>Member: ' + wawa.name + ' | Task: ' + wawa.task + '<button id="remove-assign">Remove Assignment</button>';
        displayAssignments.append(li);
    });
    getCount(thing);
}
displayAssignments.addEventListener('click', function(event){
    if(event.target.id === 'remove-assign'){
        removeAssign(event.target.parentElement.getAttribute('key'));
    }
    if(event.target.type === 'checkbox') {
        toggleAssign(event.target.parentElement.getAttribute('key'));
    }
})
getLocalAssign();
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