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

    const postMap = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const form = new FormData(document.getElementById("mapForm") as HTMLFormElement)

        const tags: string = form.get("tags") as string;

        const jsonString = JSON.stringify({ 
            name: form.get("name") as string,
            description: form.get("description") as string,
            campain: form.get("campain") as string,
            tags: tags,
            isWorldMap: form.get("worldMap") as unknown as boolean

          })
        const incomingData = await fetch('/api/uploadMap', // DOTO 
          {method: 'put',
          body: jsonString,
          headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${localStorage.getItem("sessionToken")}`
          },
        })
          if(!incomingData.ok){
            console.log("oh noes, fetch didn't work")
            return
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
                    <input type="checkbox" id="worldMap" name="worldMap" value="worldMap" />

                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name"/>

                    <label htmlFor="description">Description: </label> 
                    <textarea id="description" name="description"></textarea>


                    <label htmlFor="campain">Campain: </label>
                    <input type="text" id="campain" name="campain" />

                <br />

                    <span>Upload image: </span>
                    <input type="file" name="image" id="image" accept="image/*" />

                <br/>

                    <label htmlFor="tags">Tags (seperate tags with whitespace, example: 'forest city'): </label>
                    <div id="tagsCheckboxDiv">
                    
                    </div>

                    <input type="text" id="tags" name="tags" />

                <br/>
                <button type="submit" id="submit"> submit </button>

            </form>
        </div>
    )
}

export default Addmap