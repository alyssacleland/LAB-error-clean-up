import {
  createId, studentsOnDom, filterBtnRow, studentAreas
} from '../../public/main';
// eslint-disable-next-line import/extensions
import { form } from '../../components/visual_elements';

const houses = [
  {
    house: 'gryffindor',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png',
  },
  {
    house: 'slytherin',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png',
  },
  {
    house: 'hufflepuff',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/5/5e/Hufflepuff_crest.png',
  },
  {
    house: 'ravenclaw',
    crest:
      'https://static.wikia.nocookie.net/pottermore/images/4/4f/Ravenclaw_crest.png',
  },
];

const students = [];
const voldysArmy = []; // starts as an empty array

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array
const sortStudent = (e) => {
  e.preventDefault();
  const sortingHat = houses[Math.floor(Math.random() * houses.length)];

  if (e.target.id === 'sorting') {
    const student = document.querySelector('#student-name');

    // create the new student object
    students.push({
      id: createId(students),
      name: student.value,
      house: sortingHat.house,
      crest: sortingHat.crest,
    });

    student.value = ''; // reset value of input
    studentsOnDom('#students', students);
  }
};

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });

  // target expel buttons to move to voldys army
  document
    .querySelector('#student-container')
    .addEventListener('click', (e) => {
      if (e.target.id.includes('expel')) {
        const [, id] = e.target.id.split('--');
        const index = students.findIndex(
          (student) => student.id === Number(id)
        );

        // move from one array to another
        voldysArmy.push(...students.splice(index, 1));
        // get both sets of students on the DOM
        studentsOnDom('#students', students);
        studentsOnDom('#voldy', voldysArmy);
      }
    });

  // target expel buttons to move to voldys army
  document
    .querySelector('#student-container')
    .addEventListener('click', (e) => {
      if (e.target.id.includes('expel')) {
        const [, id] = e.target.id.split('--');
        const index = students.findIndex(
          (student) => student.id === Number(id)
        );

        // move from one array to another
        voldysArmy.push(...students.splice(index, 1));
        // get both sets of students on the DOM
        studentsOnDom('#students', students);
        studentsOnDom('#voldy', voldysArmy);
      }
    });

  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      const [, house] = e.target.id.split('--');

      if (house === 'all') {
        studentsOnDom('#students', students);
      } else if (house) {
        const filter = students.filter((student) => student.house === house);
        studentsOnDom('#students', filter, house);
      }
    }
  });
};

export {
  houses, students, voldysArmy, sortStudent, events
};
