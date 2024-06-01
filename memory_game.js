const memory_game_root = document.getElementById('memory_game_root_div');
const memory_game_reset = document.getElementById('memory_game_reset_btn');

const memory_game_anumals = document.getElementById('memory_game_anumals_btn');
const memory_game_numbers = document.getElementById('memory_game_numbers_btn');

const memory_game_level_btn_1 = document.getElementById('memory_game_level_btn_1');
const memory_game_level_btn_2 = document.getElementById('memory_game_level_btn_2');
const memory_game_level_btn_3 = document.getElementById('memory_game_level_btn_3');
const memory_game_level_btn_4 = document.getElementById('memory_game_level_btn_4');
const memory_game_level_btn_5 = document.getElementById('memory_game_level_btn_5');


const memory_game = {
  Numbers:[
    "number1.jpeg",
    "number2.png",
    "number3.png",
    "number4.png",
    "number5.png",
    "number6.png",
    "number7.png",
    "number8.png",
    "number9.png",
    "number10.png",
    "number11.png",
    "number12.png"
 ],
 Animals:[
  'Rabbit.jpeg',
  'Deer.jpeg',
  'Elephant.jpeg',
  'Fox.jpeg',
  'Giraffe.jpg',
  'Monkey.jpeg',
  'Panda.jpeg',
  'Parrot.jpeg',
  'Pig.jpeg',
  'Rhinoceros.jpeg',
  'Tiger.jpeg',
  'Zebra.jpeg'
 ],
 playArray: undefined,
 bool: true,
 inspection:{},
 win: 0,
 level: 8,
 interval:undefined,
 
}

memory_game_reset.addEventListener('click',()=> {
  clearTimeout(memory_game.interval);
  memory_game_root.style = `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  `
  memory_game.playArray = undefined;
  memory_game.level = 8;
  gaem_3_create_img_element(memory_game.Animals.concat(memory_game.Numbers));
  // audio('/public/audio/audio4.wav');
  
});

memory_game_anumals.addEventListener('click',memory_game_start);
memory_game_numbers.addEventListener('click',memory_game_start);

function memory_game_start(e){
  memory_game.playArray = e.target.innerHTML;
  memory_game_level_btn_1.addEventListener('click',()=> memory_game_level(8));
  memory_game_level_btn_2.addEventListener('click',()=> memory_game_level(6));
  memory_game_level_btn_3.addEventListener('click',()=> memory_game_level(4));
  memory_game_level_btn_4.addEventListener('click',()=> memory_game_level(2));
  memory_game_level_btn_5.addEventListener('click',()=> memory_game_level(0));
  memory_game_add_click();
  memory_game_level(memory_game.level);

}

function memory_game_add_click(){
  [...document.getElementsByClassName('memory_game_click')]
         .forEach( img => {
          img.style = "opacity: 0;";
          img.addEventListener('click', memory_game_style);
         });
}

function memory_game_style(eve){
 
  eve.target.style.opacity = 1;

  if(memory_game.bool === true && memory_game.inspection[eve.target.src] === undefined) {
    // audio('/public/audio/click1.wav');
     memory_game.inspection[eve.target.src] = eve.target.id;
     document.getElementById(eve.target.id).removeEventListener('click', memory_game_style);
     memory_game.bool = !memory_game.bool 
  }else if(memory_game.bool === false && memory_game.inspection[eve.target.src] === undefined){
    // audio('/public/audio/click3.wav');
    memory_game.bool = !memory_game.bool 
    memory_game.inspection = {};
    [...document.getElementsByClassName('memory_game_click')] .forEach( img => img.removeEventListener('click', memory_game_style));
    memory_game.interval = setTimeout(()=>{
      memory_game_add_click();
    },1500);
    memory_game.inspection = {};
  }else {
    
    memory_game.inspection[eve.target.src + 1] = eve.target.id;
    Object.values(memory_game.inspection).forEach(value => {
     const element =  document.getElementById(value);
     element.style.opacity = 1;
     element.className = "img-thumbnail";
     element.removeEventListener('click', memory_game_style);
    });
    memory_game.win -= 2;
    // audio('/public/audio/click5.wav');
    memory_game_add_click();
    memory_game.inspection = {};
    memory_game.bool = true;
  }
  
  if(memory_game.win <= 0){
    // audio('/public/audio/ambient-piano-logo-165357.mp3');
    setTimeout(() => memory_game_level(memory_game.level -=2),2000);
    ;
  }
}

function memory_game_level(num){
  // audio('/public/audio/click1.wav');
  if(memory_game.playArray !== undefined){
    let currently_array = memory_game_sort_using_arrya(memory_game[memory_game.playArray]);
    gaem_3_create_img_element(memory_game_sort_using_arrya(currently_array.slice(num) .concat(currently_array.slice(num))));
    switch (num){
      case 8 :
        memory_game_root.style = `
        display: grid;
        grid-template-columns:  repeat(2, auto) ;
        grid-template-rows: auto;
        
        `
      break;
      case 6:
        memory_game_root.style = `
        display: grid;
        grid-template-columns:  repeat(4, auto) ;
        grid-template-rows: auto;
        
        `
      break;
      case 4:
        memory_game_root.style = `
        display: grid;
        grid-template-columns:  repeat(4, auto) ;
        grid-template-rows: auto;
        
        `
      break;
      case 2:
        memory_game_root.style = `
        display: grid;
        grid-template-columns:  repeat(5, auto) ;
        grid-template-rows: auto;
        
        `
      break;
      case 0:
        memory_game_root.style = `
        display: grid;
        grid-template-columns:  repeat(6, auto) ;
        grid-template-rows: auto;
        
        `
      break;
    }
    memory_game_add_click();
  } else {
    alert('Choose your favorite images...');
  }
 
  
}

function memory_game_sort_using_arrya(array){
  const randomly = () => Math.random() - 0.5;
  return array.sort(randomly);
}

function gaem_3_create_img_element(array){
  memory_game.win = array.length;
  memory_game_root.innerHTML = "";
  array.map( img => {
    const div = document.createElement('div');
    div.style = "border: 1px solid black; border-radius:50%; margin: 2px;"
    div.innerHTML = `<img id="${Math.random()}" src="/img/${img}" alt="${img}" class="img-thumbnail memory_game_click"/>`
    memory_game_root.appendChild(div);
  });
}

gaem_3_create_img_element(memory_game.Animals.concat(memory_game.Numbers))