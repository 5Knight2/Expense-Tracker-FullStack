const form=document.querySelector('#form');
const baseurl="http://localhost:8000/"

form.addEventListener('submit',add);

function add(e){
    if(form.checkValidity()){
e.preventDefault();
const email=document.getElementById('email')
const fullname=document.getElementById('fullname')
const password=document.getElementById('password')

const obj={
    fullname:fullname,
    email:email,
    password:password
}

axios.post(baseurl+"/user/signup",obj)
.then(()=>{
    console.log('Signup done');
    window.location.href = loginpage;})
.catch((err)=>{console.log(err);})
    }else {e.preventDefault();
        form.classList.add('was-validated')
    }
}