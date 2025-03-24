import React, {useState, useEffect} from 'react'


const loadWorldMaps = async () => { // loads world maps to a list to user to choose where the location map belongs
    const incomingData = await fetch("/api/worldMaps", {method: "get"});
    const data = await incomingData.json()
    const parentDiv = document.getElementById("") //TODO add parent div and so on...
    if(parentDiv == null){
        return;
    }
    parentDiv.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
  
      const childDiv = document.createElement("div")
  
      const name = document.createElement("span") 
      const description = document.createElement("p")
      
      name.innerText = element.title
      description.innerText = element.description
  
      childDiv.appendChild(name)
      childDiv.appendChild(description)
      
      parentDiv.appendChild(childDiv)
    }
  }
  
const loadTags = async() => { // loads all tags for user to see easily
    const incomingData = await fetch("/api/tags", {method: "get"});
    const data = await incomingData.json()
    const parentDiv = document.getElementById("tagsCheckboxDiv")
    if(parentDiv == null){
        return;
    }
    parentDiv.innerHTML = ""
    console.log(data)
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
  
      const childNodeInput = document.createElement("input")
      childNodeInput.type = "checkbox"
      childNodeInput.id = "tagcheckbox" + String(index)
      childNodeInput.name = "tagcheckbox"
      childNodeInput.className = "tagcheckboxInput"
      childNodeInput.value = element.name
      
      const childNodeLabel = document.createElement("label")
      childNodeLabel.htmlFor = "tagcheckbox" + String(index)
      childNodeLabel.className = "tagcheckboxLabel"
      childNodeLabel.innerText = element.name
  
      const middleDiv = document.createElement("div")
      middleDiv.className = "tagcheckboxRowDiv"
      middleDiv.appendChild(childNodeLabel)
      middleDiv.appendChild(childNodeInput)
  
      parentDiv.appendChild(middleDiv)
    }
  }



const Addmap: React.FC = () => {
  const [causeRerender, setCauseRerender] = useState<number>(0)
  const [successMessage, setSuccessMessage] = useState<string>("")

  const postMap = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const form = document.getElementById("mapForm") as HTMLFormElement
    const formData = new FormData(form)
    const checkboxes = document.querySelectorAll('#tagsCheckboxDiv input[name="tagcheckbox"]'); // Select all checkboxes inside the `tagsCheckboxDiv`

    const checkedCheckboxes = Array.from(checkboxes) as HTMLInputElement[]; // Filter the checked checkboxes

    if (checkedCheckboxes.filter(checkbox => checkbox.checked).length > 1) { //makes sure that the tags from checkboxes are in list, as if only one is checked it is only a string
      formData.set("tagcheckboxHasMultiple", "true")
    }
    const incomingData = await fetch('/api/uploadMap',  
      {method: 'post',
      body: formData,
      headers: {
          "authorization": `Bearer ${localStorage.getItem("sessionToken")}`
      },
    })

    form.reset()
    
    if(!incomingData.ok){
      console.log("oh noes, fetch didn't work")
      setSuccessMessage("Map upload failed")
      return
    } else {
      setSuccessMessage("Map uploaded successfully")
    }

    setCauseRerender(causeRerender => causeRerender + 1)
  }

  useEffect(() => {
      const abortCtrl: AbortController = new AbortController()
      
      loadWorldMaps()
      loadTags()
      return () => abortCtrl.abort()
    }, [causeRerender])

  return (
    <div>
      <form id="mapForm" style={{
        display: 'grid',
        gridColumn: '1fr',
        justifyItems: 'center'
        }} onSubmit={(e: React.SyntheticEvent) => postMap(e)}>

              <label htmlFor="worldMap">Is it a World Map: </label>
              <input type="checkbox" id="worldMap" name="worldMap" className='textInput' value="worldMap" />

              <label htmlFor="name">Name: </label>
              <input type="text" id="name" className='textInput' name="name"/>

              <label htmlFor="description">Description: </label> 
              <textarea id="description" className='textInput' name="description"></textarea>


              <label htmlFor="campain">Campain: </label>
              <input type="text" id="campain" className='textInput' name="campain" />

          <br />

              <span>Upload image: </span>
              <input type="file" name="image" id="image" accept="image/*" />

          <br/>

              <label htmlFor="tags">Tags (seperate tags with whitespace, example: 'forest city'): </label>
              <div id="tagsCheckboxDiv">
              
              </div>

              <input type="text" className='textInput' id="tags" name="tags" />

          <br/>
          <button type="submit" id="submit"> submit </button>

      </form>
      <p> {successMessage} </p>
    </div>
  )
}

export default Addmap 