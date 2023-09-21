const sliderInput = document.querySelector(".input-slider");
const numberLabel = document.querySelector(".number--label");
const cards = document.querySelectorAll(".card")

// slider
sliderInput.addEventListener("input", () => {
	const { value, min, max, offsetWidth } = sliderInput;
	const percent = ((value - min) / (max - min)) * 100;
	const newPosition = percent * (offsetWidth / 100);
	numberLabel.style.transform = `translateX(${newPosition}px)`;
	numberLabel.textContent = value;

  const user = parseInt(value);
  cards.forEach((card,index) =>{
    const minUser = index * 10;
    const maxUser = (index+1) * 10;

    if(user >= minUser && user < maxUser){
      card.classList.add('highlight')
    } else {
      card.classList.remove('highlight')
    }
  })

  console.log(value)

});


//modal
var modal = document.getElementById('modal');
var btn = document.getElementById("openModal");
var btn1 = document.getElementById('openModal1');
var btn2 = document.getElementById('openModal2');


var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
btn1.onclick = function()  { 
  modal.style.display = "block";
}
btn2.onclick = () => { modal.style.display = "block"}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var comment = document.getElementById('comment').value;
  
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Comment:', comment);


  fetch("https://forms.maakeetoo.com/formapi/507", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    firstname: name,
    email: email,
    message: comment,
  }),
})
  .then(function(response) {
    response.json
    console.log(response.text())
    
  })
  .catch(function(error) {
    console.log("error : ",error)
  });

  // close
  modal.style.display = "none";
});



const todosContainer = document.getElementById("todos");
let currentPage = 1;
let loading = false;

//todos 
const fetchTodos = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=10`);
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.error(error);
  }
};


const renderTodos = (todos) => {
  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.textContent = todo.title;
    todosContainer.appendChild(todoElement);
  });
};

//handle lazy loading
const handleLazyLoad = async () => {
  if (loading) return;
  
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loading = true;

    const loadingElement = document.createElement("div");
    loadingElement.classList.add("loading");
    loadingElement.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
    todosContainer.appendChild(loadingElement);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const todos = await fetchTodos();
    renderTodos(todos);
    
    currentPage++;
    loading = false;
  }
};

window.addEventListener("scroll", handleLazyLoad);
handleLazyLoad();