import React, { useEffect, useState } from 'react';
//import todo from '../images/todo.svg';
import "../App.css";

//to get data from local storage

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);

  if(list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

const Todo = () => {

  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  
  const addItem = () => {
    if(!inputData) {
      alert('please fill the data');
    } else if(inputData && !toggleSubmit) {
      setItems(
        items.map ((ele) => {
          if(ele.id === isEditItem) {
            return { ...ele, name:inputData }
          }
          return ele;
        })
      )
        setToggleSubmit(true);
        
        setInputData('');
        
        setIsEditItem(null);
    } else {
       const date=new Date().getTime().toString()
       console.log(date)
      const allInputData = {id: date, name:inputData }
      setItems([...items, allInputData]); //(...) is spread operator used to store the previous data of the array and update with change.
      setInputData('')
    }
  }

  //delete the item
  const deleteItem = (index) => {
    console.log(index);
    const updateditems = items.filter((ele) => {
      return index !== ele.id;
    })

    setItems(updateditems);
  }

  //remove all
  const removeAll = () => {
    setItems([]);
  }

  //add data to local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  const editItem = (id) => {

    let newEditItem = items.find((ele) => {
      return ele.id === id
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  }

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
              <figure>
                <figcaption>Add Your Tasks Here...</figcaption>
              </figure>

              <div className='addItems'>
                <input type="text" placeholder="Add task..."
                  value={inputData}
                  onChange={(event) => setInputData(event.target.value)}
                />
                {
                  toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item"
                  onClick={addItem}></i> : <i className="far fa-edit add-btn" title="Update Item"
                  onClick={()=>{addItem() }}></i>
                }
              </div>

              <div className="showItems">

                {
                  items.map((ele) => {
                    console.log("ele",ele)
                    return(
                      <div className="eachItem" key={ele.id}>
                        <h3>{ele.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-edit add-btn" title="Edit Item"
                          onClick={() => editItem(ele.id)}>
                        </i>
                        <i className="far fa-trash-alt add-btn" title="Delete Item"
                          onClick={() => deleteItem(ele.id)}>
                        </i>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All"
                  onClick={removeAll}
                ><span> CHECK LIST </span></button>
              </div>
            </div>
        </div>
    </>
  )
}

export default Todo;