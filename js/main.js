const links = [
    {
      label: "Week1 Exercises",
      url: "week1/index.html"
    },
    {
      label: "Week2 Exercises",
      url: "week2/index.html"
    },
    {
      label: "Week3 Exercises",
      url: "week3/index.html"
    },
    {
      label: "Week4 Exercises",
      url: "week4/index.html"
    }
  ]

  var list = document.getElementById("list");

for (let i=0; i < links.length; i++){
    let a = document.createElement("a");
    let li = document.createElement("li");
    a.textContent = links[i].label;
    a.setAttribute('href', links[i].url);
    li.appendChild(a);
    list.appendChild(li); 
}