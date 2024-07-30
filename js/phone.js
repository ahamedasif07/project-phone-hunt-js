// fetching the api 

const loadPhone = async (scarchPhone='13',isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${scarchPhone}`)
    const data =await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones,isShowAll)
}

// display all phones 
const displayPhones =(phones,isShowAll)=>{
// console.log(phones)

// hide show alll btn by condition
if(phones.length > 9 && !isShowAll){
    const showAllBtnContainer=document.getElementById('show-all-container');
    showAllBtnContainer.classList.remove('hidden')

}
else{
    const showAllBtnContainer=document.getElementById('show-all-container');
    showAllBtnContainer.classList.add('hidden')
}

// show only 10 phones fris time 
// console.log('show all click',isShowAll)
// why show all part is not working
  if(!isShowAll){
    phones=phones.slice(0,12);
   }



// 1. catch the container
const phoneContainer = document.getElementById('phone-container');
// phoneContainer.innerHTML='';

phones.forEach(phone => {
    // console.log(phone)
    // 2 .creat a div
    const phoneCard = document.createElement('div')
    phoneCard.classList='card card-compact bg-base-100 p-4 shadow-xl'
   
   
    // 3.  set inner html
    phoneCard.innerHTML=`
         <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}!</h2>
                      <p>${phone.slug}</p>
                      <p>Price : $9999</p>
                      <div class="card-actions justify-end">
                        <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Detalis</button>
                      </div>
                    </div>
    `
    //4. append child in container
    phoneContainer.appendChild(phoneCard)

})
// hide loding spiner
toglolLodingSpiner(false)
}

// handle scarch btn
const handleScarch = (isShowAll) =>{
    //   loder show when lodin proccacing
    toglolLodingSpiner(true)
    const scarchFild =document.getElementById('scarch-fild');
    const scarchFildValue = scarchFild.value;
    console.log(scarchFildValue)
    loadPhone(scarchFildValue , isShowAll)
    scarchFild.value='';
}

// function for use loder
const toglolLodingSpiner=(isLoding)=>{
    const loader =document.getElementById('loder');
    if(isLoding === true){
        loader.classList.remove('hidden')
    }
    else{
        loader.classList.add('hidden')
    }
}

// handle show details
const handleShowDetails =async (id) =>{
    console.log('show details',id)
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)

}
// show phone details
const showPhoneDetails =(phone)=>{
    console.log(phone)
    show_details_modal.showModal()
    const phoneName =document.getElementById('show-detail-phone-name');
    phoneName.innerText=phone.name

    const showDetailContainer = document.getElementById('phone-details-contsiner')
    showDetailContainer.innerHTML=`
    <img {w-8} src="${phone.image}" alt="">

    <h4><span>Storage :</span>${phone.mainFeatures.storage}</h4>
    <p>GPS : ${phone?.others?.GPS ? phone?.others?.GPS : 'NO GPS Avalible' }</p>
    `
    
    

}

const handleShowALl =()=>{
    handleScarch(true)
}
loadPhone()