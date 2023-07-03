const form=document.querySelector('#expense_Form')
const ul=document.querySelector('#ul');
const premium=document.querySelector('#premium_btn');


const baseurl="http://localhost:5000/"
form.addEventListener('submit',add);
ul.addEventListener('click',remove);
premium.addEventListener('click',buy);
showall();

async function buy(e){
    e.preventDefault();
    try {
        const token=localStorage.getItem('token')
        const result=await axios.get(baseurl+'buy',{headers:{Authorization:token}});
    var options={
        'key':result.data.key_id,
        'order_id':result.data.id,
        'handler':async function(response){
            axios.post(baseurl+'changeStatus',{order_id:response.razorpay_order_id,payment_id:response.razorpay_payment_id},{headers:{Authorization:localStorage.getItem('token')}})
            .then((res)=>{alert(res.data.message)
        })}
    }
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function (response){
        axios.post(baseurl+'changeStatus',{order_id:options.order_id},{headers:{Authorization:localStorage.getItem('token')}})
        .then(()=>{alert('payment failed')})
    })

}catch(err){console.log(err)}
}

async function add(e){
    e.preventDefault();
    if(form.checkValidity()){
        const token=localStorage.getItem('token'); 
        let obj={description:document.querySelector('#description').value,
        amount:document.querySelector('#amount').value,
        type:document.querySelector('#type').value
    }

try{const token=localStorage.getItem('token');    
    const result=await axios.post(baseurl+'expense',obj,{headers:{Authorization:token}})
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
        const token=localStorage.getItem('token');
    const result=await axios.get(baseurl+'expense',{headers:{Authorization:token}})
    
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
        const token=localStorage.getItem('token');
        axios.get(baseurl+'delete/'+e.target.parentElement.id,{headers:{Authorization:token}})
        .then(()=>{  ul.removeChild(e.target.parentElement);})
        .catch(err=>{console.log(err)})
      
    }
}