const displayTeam = document.querySelector('.display-team');
const addTeam = document.querySelector('.add-team');
const teamForm = document.querySelector('.form-team');


var team = [];

teamForm.addEventListener('submit', function(event){
    if(event.target.class === 'addtoteam'){
    event.preventDefault();}
    addToTeam(addTeam.value);

});

function addToTeam(member){
if (member !== ''){
    const person = { id : Date.now(), content: member, selected: false };  
    team.push(person);
   addToLocalTeam(team);
   addTeam.value = '';
}
}

function addToLocalTeam(team){
    localStorage.setItem('team', JSON.stringify(team));
    displayTeamList(team);
}

function getLocalTeam(){
    const reference = localStorage.getItem('team');
    if (reference){
        team = JSON.parse(reference);
        displayTeamList(team);
    }
}
function toggleTeam(id) {
    team.forEach(function(member) {
       if (member.id == id) {
         member.selected = !member.selected;
      }
    });
  
    addToLocalTeam(team);
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
        let checked = '';
        if(member.selected === true){
            checked = 'checked'
        }
        li.setAttribute('key', member.id);
        li.innerHTML = '<input type="checkbox"' + member.selected + ' ' + checked + '>' + member.content + '<button id="remove-member">Remove Task</button>';
        displayTeam.append(li);
    });
    
}
displayTeam.addEventListener('click', function(event){
    if(event.target.id === 'remove-member'){
        removeTeam(event.target.parentElement.getAttribute('key'));
    }
    if(event.target.type === 'checkbox') {
        toggleTeam(event.target.parentElement.getAttribute('key'));
    }
})
getLocalTeam();
