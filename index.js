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
        <button type="button"  class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger" id =${id} onclick="deleteCard.apply(this , arguments)"><i class="fas fa-trash-alt" id =${id} onclick="deleteCard.apply(this , arguments)"></i></button>
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

let globalStore = [];

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

const updateLocalData = () =>{
  localStorage.setItem("tasky",JSON.stringify({cards : globalStore}));
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
    updateLocalData();
    // application programming interface
     //adding data to local storage

     
};


const deleteCard = (event) =>{
  
  event = window.event;

  // first search the id  and if that id matches in the global store then remove the item
  const targetId = event.target.id;
  const tagname = event.target.tagName;//BUTTON
  

  const newUpdatedArray = globalStore.filter(
    (cardObject) => cardObject.id !=targetId
  );

          // then loop over the updated global store and inject the updated card
  // newUpdatedArray.map((cardObject) =>{
  //   const createNewCard = newCard(cardObject);
  //   taskContainer.insertAdjacentHTML("beforeend", createNewCard);
  // }); this code doesnt work this js it will work only in react and nodejs

  globalStore = newUpdatedArray;
  updateLocalData();


  // access DOM to remove them

  if (tagname === "BUTTON" ){

    // access task_container
    // event.target.parentNode.parentNode.parentNode.parentNode is nothing but task__conatiner
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);

  }

  return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

};



// Features

// Edit -> Required

// HINT

// Complicated yet easy -> 

// 1. contenteditable
// 2. setAttributeNode()

// Open (Optional)