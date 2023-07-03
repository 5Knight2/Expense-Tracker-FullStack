const form=document.querySelector('#expense_Form')
const ul=document.querySelector('#ul');
let premium_btn=document.querySelector('#premium_btn');
let leaderboard_btn=null;
const prm=true;

const baseurl="http://localhost:5000/"
form.addEventListener('submit',add);
ul.addEventListener('click',remove);
premium_btn.addEventListener('click',buy);
checkuser();
showall();

function checkuser(){
    if(parseJwt(localStorage.getItem('token'))){
    ul_navbar=document.querySelector('#ul_navbar');
    premium_space=document.querySelector('#premium_space');
    premium_btn.removeEventListener("click", buy);
    premium_space.removeChild(premium_btn);
    premium_space.appendChild(document.createTextNode('Premium User'));
    premium_btn.id='leaderboard';
    leaderboard_btn=premium_btn;
   
    leaderboard_btn.childNodes[0].data='Leaderboard'
    premium_space.appendChild(leaderboard_btn);
  
    leaderboard_btn.addEventListener("click",leaderboard);
    
    
    
    

}
    
   

}

async function leaderboard(e){
    if(!document.querySelector('#leaderboard_List')){
try{
    
    const response=await axios.get(baseurl+'premium/showLeaderboard',{headers:{Authorization:localStorage.getItem("token")}})
    
    ul2=document.createElement('ul')
    for(let i=0;i<response.data.length;i++){
        str=response.data[i].id+ ' - '+response.data[i].total;
    li=document.createElement('li')
    li.appendChild(document.createTextNode(str)) 
    ul2.appendChild(li);   
        
    }
    const h3=document.createElement('h4');
    h3.appendChild(document.createTextNode('Leaderboard'))
    const div=document.createElement('div');
    div.id='leaderboard_List'
    div.classList.add('container')
    div.appendChild(h3);

    
    div.appendChild(ul2);
    document.body.appendChild(div);


}
catch(err){console.log(err)}


}}

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
                localStorage.setItem("token",res.data.token);
                location.reload();
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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).isPremium;
}