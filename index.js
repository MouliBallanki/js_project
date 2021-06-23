const taskContainer = document.querySelector(".task__container");

const newCard = ({
    id ,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription
    }) =>`<div class="col-md-6 col-lg-4 id=${id}">
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
      </div>

      <img src=${imageUrl} class=""card-image-top alt="..."/>
      <div class="card-body">
        <h5 class="card-title">${taskTitle}</h5>
        <p class="card-text">${taskDescription}</p>
        <span class="badge bg-primary">${taskType}</span> 
      </div>
      <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
      </div>
    </div>
  </div>`;

const globalStore = [];

const loadInitialTaskCards = () =>{
  // accessing local storage
  const getInitialData = localStorage.getItem("tasky");

  // checking wheather it is present or not in the local storage

  if(!getInitialData) return ;

  // cnvert stringified object into object 
  const { cards} = JSON.parse(getInitialData);

  // map around the array to generate html code and save it global storage 

  cards.map((cardObject) =>{
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  })
}

const saveChanges = () =>{
    const taskData = {
        id : `${Date.now()}`, //unique number
        imageUrl : document.getElementById("imageurl").value,
        taskTitle :document.getElementById("tasktitle").value,
        taskType :document.getElementById("tasktype").value,
        taskDescription :document.getElementById("taskdescription").value,
    };
    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(taskData) 
    // console.log(globalStore);

    // application programming interface
    localStorage.setItem("tasky",JSON.stringify({cards : globalStore})); //adding data to local storage

     
};