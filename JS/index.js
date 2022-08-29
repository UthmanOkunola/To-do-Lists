
// const itemlists = [
//     {
//         id: generateId('lists'),
//         title: 'order food online',
//         note: 'order online',
//     },
//     {
//         id: generateId('lists'),
//         title: 'refill my gas',
//         note: 'refill from Mr. Habeeb',
//     },
// ]


// for (let i = 0; i < itemlists.length; i++) {
//     html += `
//     <div class="col md-6">
//         <div class="bg-white shadow p-3">
//             <div class="d-flex justify-content-between">
//                  <p class="lead">` 
//                 html += itemlists[i].title; 
//                 html += ` 
//                  </p>
//                  <small>07/04/2022</small>
//              </div>
//             <a href="" class="btn btn-secondary" type="button" id="`
//             html += itemlists[i].id
//             html +=
//             `">View</a>
//             <a href="" class="btn btn-primary" type="button">Delete</a>
//             <a href="" class="btn btn-danger" type="button">Archive</a>

//          </div>
//      </div>
//     `
// }


///Assignment
function renderlistToDOM(){

    let html = ``;
    const listContainer = document.getElementById('listContainer');
    for (let i = 0; i < itemlists.length; i++) {
        let a = itemlists[i].title
        let b = itemlists[i].id
        html += `
        <div class="col-md-6">
            <div class="bg-white shadow p-3">
                <div class="d-flex justify-content-between">
                     <p class="lead">
                        ${a}
                     </p>
                     <small>07/04/2022</small>
                 </div>
                <a href="" class="btn btn-secondary" type="button">View</a>
                <a href="" class="btn btn-primary" type="button" onclick="deleteId();">Delete</a>
                <a href="" class="btn btn-danger" type="button">Archive</a>
    
             </div>
         </div>
        `
    };
    listContainer.innerHTML = html;
    
}
window.addEventListener('load', function(){
    if(!localStorage.getItem('lists')){
        return false;
    }
    renderlistbackToDOM('lists');
});
function addNewlist_before(){
    //Getting values from the user
    let title_input = document.getElementById('title_input').value;
    let note_input = document.getElementById('note_input').value;
    //passing the values from the user to an array
    const newlist = { title: title_input, note: note_input};
    console.log(newlist);
    //pushing the new object to an array 
    itemlists.push(newlist);
    //Re-rendering the array
    renderlistToDOM();

}

function addNewlist(){
    //Getting values from the user
    let title_input = document.getElementById('title_input').value;
    let note_input = document.getElementById('note_input').value;
    const newId = generateId('lists');
    //passing the values from a user to an array
    const newlist = {id: newId, title: title_input, note: note_input};
    //Checking if 'lists' exists in the 
    setLists('lists', newlist);
}
//As whats in the localStorage needs to be rendered to the DOM 
function renderlistbackToDOM(key){
    // //getting the data from the localStorage using the key 'lists'
    // const lists_string = localStorage.getItem('lists');
    // //converting to an array so it can be displayed
    // const lists_array = JSON.parse(lists_string);
    const lists_array = getLists(key);
    let html = ``;
    const listContainer = document.getElementById('listContainer');
    for (let i = 0; i < lists_array.length; i++) {
        let a = lists_array[i].title
        let b = lists_array[i].id
        html += `
        <div class="col-md-6">
            <div class="bg-white shadow p-3">
                <div class="d-flex justify-content-between">
                     <p class="lead">
                        ${a}
                     </p>
                     <small>07/04/2022</small>
                 </div>
                <a href="" class="btn btn-secondary" type="button">View</a>
                <a class="btn btn-primary" type="button" onclick="deleteId('lists', '${lists_array[i].id}');">Delete</a>
                <a href="" class="btn btn-danger" type="button" onclick="addNewArchive('lists', '${lists_array[i].id}');" >Archive</a>
    
             </div>
         </div>
        `
    };
    listContainer.innerHTML = html;
    
}

function addNewlist_after(){
    //Getting values from the user
    let title_input = document.getElementById('title_input').value;
    let note_input = document.getElementById('note_input').value;
    const newId = generateId('lists');
    //passing the values from the user to an array
    const newlist = {id: newId, title: title_input, note: note_input};
    console.log(newlist);
    //pushing the new object to an array 
    lists_array.push(newlist);
    //Re-rendering the array
    renderlistbackToDOM('lists');

}
function getLists(key){
    return JSON.parse(localStorage.getItem(key));
}
function setLists(key, data){
    if (getLists(key)){
        // //If the 'lists' exists then, it will be called from localStorage
        // let list_string = localStorage.getItem('lists');
        // //it is then converted to an array as its stored in string in the localStorage
        // let list_array = JSON.parse(list_string);
        lists_array = getLists(key);
        //in its array form, we push our 'data' which is in array  
        lists_array.push(data);
        //converting the pushed array data back to string
        const updatedString = JSON.stringify(lists_array);
        //setting the new updated data in string form to the localStorage
        localStorage.setItem(key, updatedString);
        renderlistbackToDOM('lists');
    }
    //if there's no 'lists' in the localStorage
    else{
        //passing the new array from the user to a new variable
        const newListArray = [data];
        //stringifying the new array to string to store in the localStorage
        let lists_string = JSON.stringify(newListArray);
        //storing the string in localStorage
        localStorage.setItem(key, lists_string);
        renderlistbackToDOM('lists');
    }
}
function generateId(key){
    const lists = getLists(key);
    if(lists){
        return lists.length +1;
    }
    else{
        return 1;
    }
}

function deleteId(key, id){
    const lists = getLists(key);
    for(let i = 0; i < lists.length; i++){
        if(lists[i].id == id){
            lists.splice(i, 1);
        }
        localStorage.setItem('lists', JSON.stringify(lists));
        renderlistbackToDOM('lists');
    }
}

function removeList(key, id){
    const lists = getLists(key);
    let removedItem = ' ';
    for(let i = 0; i < lists.length; i++){
        if(lists[i].id == id){
            removedItem = lists.splice(i, 1);
        }
        let lists_string = JSON.stringify(lists);
        localStorage.setItem(key, lists_string);
        renderlistbackToDOM('lists');
        return removedItem;
    }
}

function addNewArchive(key, id){
    const archiveLists = removeList(key, id);
    // setLists('archive', data);
    setLists('archive', archiveLists);

}
