const form=document.querySelector('#form');
const baseurl="http://localhost:8000/"

form.addEventListener('submit',add);

async function add(e){
  try{  if(form.checkValidity()){
e.preventDefault();
const email=document.getElementById('email')
const fullname=document.getElementById('fullname')
const password=document.getElementById('password')

const obj={
    fullname:fullname,
    email:email,
    password:password
}

const response=await axios.post(baseurl+"/user/signup",obj)

if(response.status===201){
    console.log('Signup done');
    window.location.href = loginpage;}

    else{
        throw new Error("Failed to sign-up")
    }

    }else {e.preventDefault();
        form.classList.add('was-validated')
    }
}catch(err){console.log(err);
            alert(err)
            }
}