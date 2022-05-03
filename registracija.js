let studentsLocalStorage = JSON.parse(localStorage.getItem('initialStudentsData'));
const  INITIAL_STUDENT_DATA = studentsLocalStorage ? studentsLocalStorage : [];
// console.log(INITIAL_STUDENT_DATA);

// const INITIAL_STUDENT_DATA = [

//     {
//         name: 'Vardas 1',
//         surname: 'Pavarde 1',
//         age: 20,
//         phone: +370612824244,
//         email: 'vardas1!@gmail.com',
//         itKnowledge: 5,
//         group: 10,
//         interests: [
//             'JavaScript',
//             'TypeScript',
//             'React'
//         ]
// },
// {
//     name: 'Vardas 2',
//     surname: 'Pavarde 2',
//     age: 30,
//     phone: +370824244,
//     email: 'vardas1@gmail.com',
//     itKnowledge: 7,
//     group: 10,
//     interests: [
//         'WordPress',
//         'CSS',
//         'Test'
//     ]
// },
// {
//     name: 'Vardas 3',
//     surname: 'Pavarde 3',
//     age: 40,
//     phone: +370824244,
//     email: 'vardas1@gmail.com',
//     itKnowledge: 7,
//     group: 5,
//     interests: [
//         'WordPress',
//         'CSS',
//         'Test'
//     ]
// },
// {
//     name: 'Vardas 4',
//     surname: 'Pavarde 4',
//     age: 50,
//     phone: +370824244,
//     email: 'vardas1@gmail.com',
//     itKnowledge: 9,
//     group: 10,
//     interests: [
//         'WordPress',
//         'CSS',
//         'Test'
//     ]
// },
// {
//     name: 'Vardas 5',
//     surname: 'Pavarde 5',
//     age: 99,
//     phone: +370824244,
//     email: 'vardas1@gmail.com',
//     itKnowledge: 10,
//     group: 1,
//     interests: [
//         'WordPress',
//         'CSS',
//         'Test'
//     ]
// },

// ];

let studentForm = document.querySelector('#student-form'); 
let editStudent = null;
studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    


   let validForm = formErrorHandler(studentForm);
    if (!validForm) {
        return;
    }

    let formInterests = document.querySelectorAll('input[name=interest]:checked');
    let interestValues = [...formInterests].map(element => {
        return element.value;
    });
    
    let studentFormData = {
        name: document.querySelector('input[name=name]').value,
        surname: document.querySelector('#student-surname').value,
        age: event.target.elements.age.value,
        phone: studentForm.querySelector('#student-phone').value,
        email: document.querySelector('#student-email').value,
        itKnowledge: event.target.elements['it-knowledge'].value,
        group: event.target.elements.group.value,
        interests: interestValues, 
     
    };

    if (editStudent){
        alertMessage(`Student edited (${studentFormData.name} ${studentFormData.surname})`);
    } else {
        alertMessage(`Student created (${studentFormData.name} ${studentFormData.surname})`)
    }
  
    renderStudent(studentFormData);

    let studentsDataArray = [studentFormData, ...INITIAL_STUDENT_DATA];
    localStorage.setItem('initialStudentsData', JSON.stringify(studentsDataArray));

 
    studentForm.reset();
    itKnowledgeOutputReset();
 });

 function itKnowledgeOutputReset() {


    let itKnowledgeElement = document.querySelector('#student-it-knowledge');
    let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
    
    itKnowledgeOutput.textContent = itKnowledgeElement.value;
    
    itKnowledgeElement.addEventListener ('input', () => {
        itKnowledgeOutput.textContent = itKnowledgeElement.value;
    });
    }
   
    function alertMessage(text, elementClass = '') {
        let alertElement = document.querySelector('#alert');
        alertElement.textContent = text;

        if (elementClass) { 
        alertElement.classList.add(elementClass);
    }
        setTimeout(() => {
            alertElement.textContent = '';
            if(elementClass) { 
            alertElement.classList.remove(elementClass);
             }
        }, 5000);
    
    }

 function renderInitialStudentData(students) {
     if (!students) {
         return;
     }
    students.map((student) => {
    renderStudent(student);
    });
}
function renderStudent(studentData) {
    
    let personName = studentData.name;
    let personSurname = studentData.surname;
    let personAge = studentData.age;
    let personPhone = studentData.phone ;
    let personEmail = studentData.email;
    let personItKnowledge = studentData.itKnowledge;
    let personGroup = studentData.group;
    let interests = studentData.interests;
    
    let studentsList = document.querySelector('#students-list');
    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');

    let personNameElement = document.querySelector('input[name=name]');
    personNameElement.classList.remove('input-error');

    let studentNameEl = document.createElement('p');
    studentNameEl.innerHTML = `<strong>Vardas: </strong><span class="student-name">${personName}</span>`;

    let studentSurnameEl = document.createElement('p');
    studentSurnameEl.innerHTML = `<strong>Pavarde: </strong><span class="student-surname">${personSurname}</span>`;

    let studentAgeEl = document.createElement('p');
    studentAgeEl.innerHTML = `<strong>Amzius: </strong><span class="student-age">${personAge}</span>`;

    let studentPhoneEl = document.createElement('p');
    studentPhoneEl.innerHTML = `<strong>Telefonas: </strong><span class="hidden-area ">****</span>`;

    let studentEmailEl = document.createElement('p');
    studentEmailEl.innerHTML = `<strong>El.Pastas: </strong><span class="hidden-area ">****</span>`;

    let studentItKnowledgeEl= document.createElement('p');
    studentItKnowledgeEl.innerHTML = `<strong>IT zinios: </strong><span class="student-it-knowledge">${personItKnowledge}</span>`;

    let studentGroupEl = document.createElement('p');
    studentGroupEl.innerHTML = `<strong>Grupe: </strong><span class="student-group">${personGroup}</span>`;
    
    let interestsWrapperEl = document.createElement('div');
    let interestTitleEl = document.createElement('h4');
    interestTitleEl.textContent = "Interests:";

    let studentInterestsEl = document.createElement('ul');

    interests.forEach((interest) => {

    let interestItem = document.createElement('li');
    interestItem.textContent = interest;

    interestItem.addEventListener('click', () => interestItem.style.color = 'red')

    studentInterestsEl.append(interestItem);
    });

    interestsWrapperEl.append (interestTitleEl, studentInterestsEl);

    let privateInfoButton = document.createElement('button');
    privateInfoButton.textContent = 'Rodyti asmens duomenis';

    
    privateInfoButton.addEventListener('click', () => {


        if (privateInfoButton.classList.contains('hide')) { 
        studentPhoneEl.querySelector('.hidden-area').textContent = '****';
        studentEmailEl.querySelector('.hidden-area').textContent = '*******';
        privateInfoButton.textContent = 'Rodyti pasleptus duomenis';
    } else {
  
        studentPhoneEl.querySelector('.hidden-area').textContent = personPhone;
        studentEmailEl.querySelector('.hidden-area').textContent = personEmail;
        privateInfoButton.textContent = 'Slepti asmens duomenis';
    }
    privateInfoButton.classList.toggle('hide');
 });

let deleteStudentButton = document.createElement('button');
deleteStudentButton.textContent = 'Istrinti studenta';


deleteStudentButton.addEventListener('click', () => {
    studentItem.remove();
    alertMessage(`Studentas ${personName} ${personSurname} sekmingai istrintas`);

});
let editStudentButton = document.createElement('button');
editStudentButton.textContent = 'Redaguoti studento duomenis';

editStudentButton.addEventListener('click', ()  => {
    console.log(studentItem);
    studentForm.querySelector('#student-name').value = personName;
    studentForm.querySelector('#student-surname').value = personSurname;
    studentForm.querySelector('#student-age').value = personAge;
    studentForm.querySelector('#student-phone').value = personPhone;
    studentForm.querySelector('#student-email').value = personEmail;
    studentForm.querySelector('#student-it-knowledge').value = personItKnowledge;
    studentForm.elements.group.value = personGroup;

interests.map(singleInterest => {
    studentForm.elements.interest.forEach(formInterest =>{ 
                if (singleInterest === formInterest.value) {
            formInterest.checked =  true;
        }
        })
})

    itKnowledgeOutputReset();

    studentForm.querySelector('[type=submit]').value = 'Save Changes';

    editStudent = studentItem;
});

    studentItem.append(studentNameEl, studentSurnameEl, studentAgeEl, studentPhoneEl, studentEmailEl, studentItKnowledgeEl, studentGroupEl, interestsWrapperEl, privateInfoButton,deleteStudentButton, editStudentButton );

    studentsList.prepend(studentItem);
// let studentsDataArray = [];


    if (editStudent) {
    editStudent.replaceWith(studentItem);
    editStudent = null;
    studentForm.querySelector('[type=submit]').value = 'Submit';
} else {
    studentsList.prepend(studentItem);
}
 };

function formErrorHandler(form) {
     let inputErrorMessages = form.querySelectorAll('.input-error-message');
     inputErrorMessages.forEach(message => message.remove());
    
     form.querySelectorAll('input.input-error').forEach(input => input.classList.remove('input-error'));
      
    let requiredInputs = form.querySelectorAll('input.required');

    let formValid = true;

    requiredInputs.forEach(input => {
        if(!input.value) {
        formValid = false;
            inputErrorMessage(input, 'Sis laukelis yra privalomas' );
        } else {
            if (input.name === 'name') {
                if(input.value.length < 3) {
                    inputErrorMessage(input, 'Vardas yra per trumpas' );
                    formValid = false;
                }
            }
            if (input.name === 'surname') {
                if(input.value.length < 3) {
                    inputErrorMessage(input, 'Pavarde yra per trumpa' );
                    formValid = false;
                }
            }
            if (input.name === 'age') {
                if(input.value < 1) {
                    inputErrorMessage(input, 'Amzius per mazas' );
                    formValid = false;

        }
}
if (input.name === 'phone') {
    if(input.value.length < 9 || input.value.length > 12) {
        inputErrorMessage(input, 'Telefonas per trumpas' );
        formValid = false;

}
}
}
    })

    return formValid;
    }

function inputErrorMessage(inputElement, errorMessage) {
        inputElement.classList.add('input-error');
        alertMessage('ne visi laukeliai uzpildyti', 'error-alert');
        let inputError = document.createElement('span');
        inputError.textContent = errorMessage;
        inputError.classList.add('input-error-message');
        inputElement.after(inputError);
    }


let searchForm = document.querySelector('#search');



searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
 
    let searchInput = event.target.elements.search.value.toLowerCase();
    console.log(searchInput);

    let searchVariation = event.target.elements.variations.value;
    console.log(searchVariation);

    let students = document.querySelectorAll('.student-item');
    
    students.forEach(student => {
        console.log(searchInput)
        
    let studentName = student.querySelector('.student-name').textContent.toLowerCase();

        let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();

            let studentAge = student.querySelector('.student-age').textContent;

            let studentItKnowledge = student.querySelector('.student-it-knowledge').textContent;

            let studentGroup = student.querySelector('.student-group').textContent;


switch (searchVariation) {
    case 'name':
        if (studentName.includes(searchInput)){
            student.style.display = 'block';
        } else {
            student.style.display = 'none';
        }
    break;

    case 'surname':
        if(studentSurname.includes(searchInput)) {
            student.style.display = 'block';
        } else {
            student.style.display = 'none';
        }

    break;

    case 'age':
        if(studentAge == searchInput) {
            student.style.display = 'block';
        } else {
            student.style.display = 'none';
        }

    break;

    case 'it-knowledge':
        if(studentItKnowledge == searchInput) {
            student.style.display = 'block';
        } else {
            student.style.display = 'none';
        }
break;
        case 'group':
            if(studentGroup == searchInput) {
                student.style.display = 'block';
            } else {
                student.style.display = 'none';
            }

    break;
    default:
     }
    })
})     


 studentForm.addEventListener('input', (event) => {

        let formInfo = {
            name: studentForm.querySelector('#student-name').value,
            surname: studentForm.querySelector('#student-surname').value,
            age:studentForm.querySelector('#student-age').value,
            phone: studentForm.querySelector('#student-phone').value,
            email: studentForm.querySelector('#student-email').value,
            itKnowledge: studentForm.querySelector('#student-it-knowledge').value,
            group: studentForm.elements.group.value,
            interests: []
        }

    studentForm.querySelectorAll('input[name=interest]:checked').forEach(interest =>{
    formInfo.interests.push(interest.id);
});
        localStorage.setItem('form-info', JSON.stringify(formInfo));

    });

    let localStorageFormInfo = JSON.parse(localStorage.getItem('form-info'));

     
    studentForm.querySelector('#student-name').value = localStorageFormInfo.name;
    studentForm.querySelector('#student-surname').value = localStorageFormInfo.surname;
    studentForm.querySelector('#student-age').value = localStorageFormInfo.age;
    studentForm.querySelector('#student-phone').value = localStorageFormInfo.phone;  
    studentForm.querySelector('#student-email').value = localStorageFormInfo.email;
    studentForm.querySelector('#student-it-knowledge').value = localStorageFormInfo.itKnowledge;
    studentForm.elements.group.value = localStorageFormInfo.group;
 
localStorageFormInfo.interests.forEach(interest => {
    studentForm.querySelector(`input#${interest}`).checked = true;
});
renderInitialStudentData(INITIAL_STUDENT_DATA);

itKnowledgeOutputReset();