window.addEventListener('load', function(){
    if(!localStorage.getItem('archive')){
        return false;
    }
    renderlistbackToDOMArchive('archive');
    });
function renderlistbackToDOMArchive(key){
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
                <a class="btn btn-primary" type="button" onclick="deleteId('archive', '${b}');">Delete</a>
                <a href="" class="btn btn-danger" type="button" onclick="addNewArchive('archive', '${b}');" >Restore</a>
    
             </div>
         </div>
        `
    };
    listContainer.innerHTML = html;
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
        renderlistbackToDOMArchive('archive');
    }
    //if there's no 'lists' in the localStorage
    else{
        //passing the new array from the user to a new variable
        const newListArray = [data];
        //stringifying the new array to string to store in the localStorage
        let lists_string = JSON.stringify(newListArray);
        //storing the string in localStorage
        localStorage.setItem(key, lists_string);
        renderlistbackToDOMArchive('archive');
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
        localStorage.setItem('archive', JSON.stringify(lists));
        renderlistbackToDOMArchive('archive');
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
        renderlistbackToDOMArchive('archive');
        return removedItem;
    }
}

function addNewArchive(key, id){
    const archiveLists = removeList(key, id);
    // setLists('archive', data);
    setLists('lists', archiveLists);

}