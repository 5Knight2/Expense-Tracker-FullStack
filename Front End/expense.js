const form=document.querySelector('#expense_Form')
const baseurl="http://localhost:5000/"
form.addEventListener('submit',add);
showall();

async function add(e){
    e.preventDefault();
    if(form.checkValidity()){
        let obj={description:document.querySelector('#description').value,
        amount:document.querySelector('#amount').value,
        type:document.querySelector('#type').value
    }

try{    const result=await axios.post(baseurl+'expense',obj)
if(result){
    obj.id=result.data
    show(obj);
}
}
catch(err){console.log(err)}

    }else{form.classList.add('was-validated')}

}

function showall(){
    axios.get(baseurl+'expense')
    .then((result)=>{
        for(let i=0;i<result.data.length;i++){
            show(result.data[i])
        }
    })
    .catch((err)=>{console.log(err)})
}

function show(obj){
    const str=obj.amount+' - '+obj.description+' - '+obj.type;
    const ul=document.querySelector('#ul')
    const li=document.createElement('li');
    li.id=obj.id;
   const text=document.createTextNode(str)
    li.appendChild(text)
    ul.appendChild(li)
}