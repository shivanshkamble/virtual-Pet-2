var dog, happyDog;
var food, foodStock;
var database;
var foodObj;
var lastFed;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
  
}

function setup() {
  database = firebase.database();
	createCanvas(800, 800);
  dog = createSprite(300,600,600,20);
  dog.addImage(dogImage);
  dog.scale = 0.5
  foodStock = database.ref('Food');
  foodStock.on("value", readStock)

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food()
}


function draw() {  
background(46,139,87)
textSize(30)
text("Note: Press up arrow to feed the dog",200,250)
text("Food in Stock:"+food,250,300)

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,20);
  }else if(lastFed==0){
    text("Last Feed : 12 AM" , 350,30 );
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }

fedTime=database.ref('feedTime');
fedTime.on("value",function(data) {
lastFed=data.val();
})






foodObj.display();
  drawSprites();
  

}

function readStock(data){
  food = data.val();
  foodObj.updateFoodStock(food);
  if(food<0){
    food = 0
  }
}



function feedDog(){
  dog.addImage(happyDogImg);


foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
}
)
}

function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}