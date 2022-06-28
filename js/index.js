const addContentBtn = document.querySelector('#addContentButton')
const DACButton = document.querySelector('#DACButton')
const bd = document.querySelector('body')
const contents = document.querySelector('#contents')
const defContents = [
    {
        name:"YeaeThawe",
        phone:"+959956571727",
        email:"yeaethawe@gmail.com",
        address:"Me Za Li Kone",
        country:"Myanmar"
    }
]
let obj = []

if(localStorage.getItem('localContents')){
    loadLocalContents()
}else{
    localStorage.setItem('localContents',btoa(JSON.stringify(defContents)))
    loadLocalContents()
}

//functions
function addContent(name,phone,email,address,country){
    let currentObj = {}
    currentObj.name=name
    currentObj.phone=phone
    currentObj.email=email
    currentObj.address=address
    currentObj.country=country
    obj.push(currentObj)
    localStorage.setItem('localContents',btoa(JSON.stringify(obj)))
    loadLocalContents()
}

function loadFromLocalStorage(){
    obj = JSON.parse(atob(localStorage.getItem('localContents')))
}

function saveToLocalStorage(){
    localStorage.setItem('localContents',btoa(JSON.stringify(obj)))
}

function loadLocalContents(){
    clearContents()
    loadFromLocalStorage()
    for (let i = 0; i < obj.length; i++){
        if(obj[i]){
            let div = document.createElement('div')
            let div2 = document.createElement('div')
            let deleteBtn = document.createElement('button')
            let dDiv = document.createElement('div');
            let name = document.createElement('label')
            let phone = document.createElement('label')
            let email = document.createElement('label')
            let address = document.createElement('label')
            let country = document.createElement('label')

            div.style=`
                display:flex;
                flex-direction:column;
                border:2px solid white;
                border-radius:10px;
            `;
            div.className="bg-gray fg-white"
            dDiv.style=`
                display:flex;
                flex-direction:column;
            `;
            div2.className="center"
            div2.style=`
                justify-content:space-between;
            `;
            dDiv.style.display="none"
            deleteBtn.className="common-btn SS pad-5"
            deleteBtn.style=`
                width:20%;
            `;
            deleteBtn.textContent="delete"

            name.className="fs-20 SS fg-black"
            name.style=`
                padding-left:5px;
            `;
            phone.className="fs-20 SS "
            address.className="fs-20 SS fg-orange"
            email.className="fs-20 SS"
            country.className="fs-20 SS"

            name.textContent = obj[i].name
            phone.textContent = obj[i].phone
            email.textContent = obj[i].email
            address.textContent = obj[i].address
            country.textContent = obj[i].country

            div2.appendChild(name)
            div2.appendChild(deleteBtn)
            div.appendChild(div2)
            div.appendChild(phone)
            dDiv.appendChild(email)
            dDiv.appendChild(address)
            dDiv.appendChild(country)
            contents.appendChild(div)
            div.appendChild(dDiv)

            div.onmouseenter=()=>{
                dDiv.style.display="flex"
            }
            div.onmouseleave=()=>{
                dDiv.style.display="none"
            }
            deleteBtn.onclick=()=>{
                obj.splice(i,1)
                if(confirm("Are you sure that you want to delete this content?")){saveToLocalStorage();loadLocalContents()}
            }
        }
    }
}

function clearContents(){
    while(contents.lastChild){
        contents.removeChild(contents.firstChild)
    }
}

function addForm(){
    let cover = document.createElement('div')
    let mid = document.createElement('div')
    let foot = document.createElement('foot')
    let closeBtn = document.createElement('button')
    let addBtn = document.createElement('button')
    let center = document.createElement('center')
    let header = document.createElement('label')
    let midofmid = document.createElement('div')

    let nameI = document.createElement('input')
    let phoneI = document.createElement('input')
    let emailI = document.createElement('input')
    let addressI = document.createElement('input')
    let countryI = document.createElement('input')

    cover.className = "cover"
    mid.className="popup"
    mid.style.display="block"
    header.className="pad-5 SS fs-40"
    header.textContent="Add Content Form"
    foot.className="pad-5 flex"
    closeBtn.className="common-btn fs-20"
    addBtn.className="common-btn fs-20"

    nameI.className="inputText"
    phoneI.className="inputText"
    emailI.className="inputText"
    addressI.className="inputText"
    countryI.className="inputText"

    nameI.placeholder="name"
    phoneI.placeholder="phone number"
    phoneI.type="number"

    emailI.placeholder="email address"
    countryI.placeholder="country"

    addressI.placeholder="home address"
    countryI.type="select"

    closeBtn.textContent="close"
    addBtn.textContent="add"
    closeBtn.style.backgroundColor="red"
    closeBtn.onmouseleave=()=>{closeBtn.style.backgroundColor="red"}
    closeBtn.onmouseenter=()=>{closeBtn.style.backgroundColor="pink"}

    midofmid.style.width="90%"

    center.appendChild(header)
    foot.appendChild(closeBtn)
    foot.appendChild(addBtn)

    mid.appendChild(center)
    midofmid.appendChild(nameI)
    midofmid.appendChild(phoneI)
    midofmid.appendChild(emailI)
    midofmid.appendChild(addressI)
    midofmid.appendChild(countryI)
    center.appendChild(midofmid)
    mid.appendChild(foot)

    bd.appendChild(cover)
    bd.appendChild(mid)
    closeBtn.onclick=()=>{bd.removeChild(cover); bd.removeChild(mid)}
    addBtn.onclick=()=>{
        if(nameI.value){
            if(phoneI.value){
                addContent(nameI.value,phoneI.value,emailI.value,addressI.value,countryI.value);closeBtn.onclick()
            }else{
                alert('You need to fill the phone number.')
            }
        }else{
            alert('You need to fill the name.')
        }
    }
}

addContentBtn.onclick = () => {
    addForm()
}

DACButton.onclick=()=>{
    if(confirm('Are you sure that you want to delete all contents in you localstorage?')){
        obj = []
        saveToLocalStorage()
        clearContents()
    }
}