document.addEventListener('DOMContentLoaded', () => {
   const tableBody = document.querySelector('#table-body');
   const form = document.querySelector('form');
   const inputName = document.querySelector('[name="name"]')
   const inputBreed = document.querySelector('[name="breed"]')
   const inputSex = document.querySelector('[name="sex"]')


    function fetchDogs(){
        fetch('http://localhost:3000/dogs')
        .then(resp=>resp.json())
        .then(obj=>{
            for(const dog of obj){
                const tr = document.createElement('tr');
                const nameTd = document.createElement('td');
                const breedTd = document.createElement('td');
                const sexTd = document.createElement('td');
                const btnTd = document.createElement('td');
                const btn = document.createElement('BUTTON');

                nameTd.textContent = dog['name'];
                breedTd.textContent = dog['breed'];
                sexTd.textContent = dog['sex'];
                btn.textContent = 'Edit Dog';

                btnTd.appendChild(btn);
                tr.appendChild(nameTd);
                tr.appendChild(breedTd);
                tr.appendChild(sexTd);
                tr.appendChild(btnTd);

                tableBody.appendChild(tr);

                btn.addEventListener('click', ()=>{
                    inputName.value = dog['name'];
                    inputBreed.value = dog['breed'];
                    inputSex.value = dog['sex'];  
                    
                    form.addEventListener('submit',e=>{
                        e.preventDefault();
    
                        fetch(`http://localhost:3000/dogs/${dog['id']}`,{
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify({
                                'name': inputName.value,
                                'breed': inputBreed.value,
                                'sex': inputSex.value
                            })
                        })
                        nameTd.textContent = inputName.value;
                        breedTd.textContent = inputBreed.value;
                        sexTd.textContent = inputSex.value;
                        
                    })
                });

            }
        })
    }

    fetchDogs();

    form.addEventListener('submit',e=>{
        e.preventDefault();
    })

})