const form=document.querySelector('#expense_Form')
const ul=document.querySelector('#ul');

const baseurl="http://localhost:5000/"
form.addEventListener('submit',add);
ul.addEventListener('click',remove);
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

async function showall(){
    try{
    const result=await axios.get(baseurl+'expense')
    
        for(let i=0;i<result.data.length;i++){
            show(result.data[i])
        }
    }
    catch(err){console.log(err)}
}

function show(obj){

    const str=obj.amount+' - '+obj.description+' - '+obj.type;
    const ul=document.querySelector('#ul')
    const li=document.createElement('li');
    li.id=obj.id;
    const amt=document.createElement('input');
    amt.type='number';
    amt.value=obj.amount;
    amt.disabled=true;
    li.appendChild(document.createTextNode('Amount:'))
    li.appendChild(amt);

    const desc=document.createElement('input');
    desc.type='text';
    desc.value=obj.description;
    desc.disabled=true;
    li.appendChild(document.createTextNode('Description:'))
    li.appendChild(desc);

    const type=document.createElement('input');
    type.type='text';
    type.value=obj.type;
    type.disabled=true;
    li.appendChild(document.createTextNode('type:'))
    li.appendChild(type);

    const btn=document.createElement('button');
    btn.style.borderColor='red';
    btn.classList.add('delete')
        
    btn.appendChild(document.createTextNode('Delete'));
    li.appendChild(document.createTextNode(' . . . . .'));
    li.appendChild(btn)
    ul.appendChild(li)
}

function remove(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        axios.get(baseurl+'delete/'+e.target.parentElement.id)
        .then(()=>{  ul.removeChild(e.target.parentElement);})
        .catch(err=>{console.log(err)})
      
    }
}