const accordion2 = document.querySelectorAll(".hover-container");
for (let i = 0; i < accordion2.length; i++) {
    // accordion2[i].addEventListener('mouseenter', openAcc)
    // accordion2[i].addEventListener('mouseleave', closeAcc)
    accordion2[i].addEventListener('click', toggleAcc)
}

function initAcc(elem, option){
    document.addEventListener('click', function (e) {
        if (!e.target.matches(elem+' .a-btn')) return;
        else{
            if(!e.target.parentElement.classList.contains('active')){
                if(option==true){
                    var elementList = document.querySelectorAll(elem+' .a-container');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }            
                e.target.parentElement.classList.add('active');
            }else{
                e.target.parentElement.classList.remove('active');
            }
        }
    });
}

// function openAcc(e) {
//     e.target.classList.add('active')
// }

// function closeAcc(e) {
//     e.target.classList.remove('active')
// }

function toggleAcc(e) {
    if(e.target.parentElement.className === "a-btn"){
        e.target.parentElement.parentElement.classList.toggle('active')
    }
    else if(e.target.parentElement.parentElement.className === "a-btn"){
        e.target.parentElement.parentElement.parentElement.classList.toggle('active')
    }
}



initAcc('.accordion.v1', true);
initAcc('.accordion.v2', true);