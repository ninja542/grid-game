/* jshint esversion: 6 */

let grid_size = 9;
let margin = 10;
let canvas_size = 600;
let ball_coordinates_list = [[0,0],[0,grid_size - 1],[grid_size - 1,0],[grid_size - 1,grid_size - 1]];
let ball_coordinates_list_before = [];
let enemy_coordinates = [5,5];
var enemy_coordinates_after = [5,5];
let timer = 10;
var collision = 0;

function setup(){
	createCanvas(canvas_size,canvas_size);
}

function draw(){
	background(255);
	strokeWeight(1);
	for(let i = 0; i < grid_size; i++){
		line(margin + i * (canvas_size - 2 * margin)/(grid_size - 1), margin, margin + i * (canvas_size - 2 * margin)/(grid_size - 1), canvas_size - margin);
		line(margin, margin + i * (canvas_size - 2 * margin)/(grid_size - 1), canvas_size - margin, margin + i * (canvas_size - 2 * margin)/(grid_size - 1));
	}
	strokeWeight(0);
	for(let i = 0; i < ball_coordinates_list.length; i++){
		let transformed_coords =  transformation(ball_coordinates_list[i]);
		if(i == 0){
			fill(color(255,0,0));
		}
		if(i == 1){
			fill(color(0,255,0));
		}
		if(i == 2){
			fill(color(0,0,255));
		}
		if(i == 3){
			fill(color(255,0,255));
		}
		ellipse(transformed_coords[0], transformed_coords[1], 20, 20);
	}
	textAlign(LEFT, TOP);
	textSize(100);
	timer_loop();
	let transformed_enemy_coords = transformation(enemy_coordinates);
	fill(color(255,165,0));
	square(transformed_enemy_coords[0]-15,transformed_enemy_coords[1]-15,30);
	enemyLogic();
	if(enemy_captured()){
		timer = 0;
	  text("YOU WIN", 0, 0);
	}
}
function enemyLogic(){
	enemy_overlap();
	//enemy_coordinates_after = enemy_coordinates;
	var Action = Math.floor((Math.random() * 5));
	//console.log(enemy_coordinates[0]);
	if(frameCount%15 == 0 && timer > 0){
	switch(Action){
		case 1:
			enemy_coordinates_after[0] = enemy_coordinates[0] - 1;
			enemy_coordinates_after[1] = enemy_coordinates[1];
			enemy_overlap();
			if(enemy_coordinates[0] > 1 && collision == 0)
			{
			enemy_coordinates[0] -= 1; //left
			}
			else
			{
				enemyLogic();
			}
			break;
		case 2:
			enemy_coordinates_after[0] = enemy_coordinates[0];
			enemy_coordinates_after[1] = enemy_coordinates[1]-1;
			enemy_overlap();
			if(enemy_coordinates[1] > 1 && collision == 0){
			enemy_coordinates[1] -= 1; //up
			}
			else{
				enemyLogic();
			}
			break;
		case 3:
			enemy_coordinates_after[0] = enemy_coordinates[0] + 1;
			enemy_coordinates_after[1] = enemy_coordinates[1];
			enemy_overlap();
			if(enemy_coordinates[0]< grid_size - 2 && collision == 0){
			enemy_coordinates[0] += 1; //right
		}
		else{
			enemyLogic();
		}
			break;

		case 4:
			enemy_coordinates_after[0] = enemy_coordinates[0];
			enemy_coordinates_after[1] = enemy_coordinates[1]+1;
			enemy_overlap();
		if(enemy_coordinates[1] < grid_size - 2 && collision == 0){
			enemy_coordinates[1] += 1; //down
		}
		else{
			enemyLogic();
			break;
		}
		default: //stay
			break;
	}
	enemy_overlap();
	if(enemy_overlap == 1){
		enemyLogic();
	}
	}
}

function keyPressed(){
	ball_coordinates_list_before = JSON.parse(JSON.stringify(ball_coordinates_list));
	if (keyCode === 104 && ball_coordinates_list[3][1] > 0) {
		ball_coordinates_list[3][1] -= 1;
	}
	if (keyCode === 101 && ball_coordinates_list[3][1] < grid_size - 1) {
		ball_coordinates_list[3][1] += 1;
	}
	if (keyCode === 100 && ball_coordinates_list[3][0] > 0) {
		ball_coordinates_list[3][0] -= 1;
	}
	if (keyCode === 102 && ball_coordinates_list[3][0] < grid_size - 1) {
		ball_coordinates_list[3][0] += 1;
	}
	if (keyCode === UP_ARROW && ball_coordinates_list[2][1] > 0) {
		ball_coordinates_list[2][1] -= 1;
	}
	if (keyCode === DOWN_ARROW && ball_coordinates_list[2][1] < grid_size - 1) {
		ball_coordinates_list[2][1] += 1;
	}
	if (keyCode === LEFT_ARROW && ball_coordinates_list[2][0] > 0) {
		ball_coordinates_list[2][0] -= 1;
	}
	if (keyCode === RIGHT_ARROW && ball_coordinates_list[2][0] < grid_size - 1) {
		ball_coordinates_list[2][0] += 1;
	}
	if (keyCode === 84 && ball_coordinates_list[1][1] > 0) {
		ball_coordinates_list[1][1] -= 1;
	}
	if (keyCode === 71 && ball_coordinates_list[1][1] < grid_size - 1) {
		ball_coordinates_list[1][1] += 1;
	}
	if (keyCode === 70 && ball_coordinates_list[1][0] > 0) {
		ball_coordinates_list[1][0] -= 1;
	}
	if (keyCode === 72 && ball_coordinates_list[1][0] < grid_size - 1) {
		ball_coordinates_list[1][0] += 1;
	}
	if (keyCode === 87 && ball_coordinates_list[0][1] > 0) {
		ball_coordinates_list[0][1] -= 1;
	}
	if (keyCode === 83 && ball_coordinates_list[0][1] < grid_size - 1) {
		ball_coordinates_list[0][1] += 1;
	}
	if (keyCode === 65 && ball_coordinates_list[0][0] > 0) {
		ball_coordinates_list[0][0] -= 1;
	}
	if (keyCode === 68 && ball_coordinates_list[0][0] < grid_size - 1) {
		ball_coordinates_list[0][0] += 1;
	}
	collision_detect(ball_coordinates_list_before, ball_coordinates_list);
	enemy_detect(ball_coordinates_list_before, ball_coordinates_list);
}

function transformation(coordinates){
	return [margin + coordinates[0] * (canvas_size - 2 * margin)/(grid_size - 1), margin + coordinates[1] * (canvas_size - 2 * margin)/(grid_size - 1)];
}

function collision_detect(){
	for (let i = 0; i < ball_coordinates_list.length; i++){
		// console.log(ball_coordinates_list[i], ball_coordinates_list_before[i]);
		let index_list = getAllIndexes(ball_coordinates_list, ball_coordinates_list[i]);
		if(index_list.length > 1){
			for(let j = 0; j < index_list.length; j++){
				ball_coordinates_list[index_list[j]] = ball_coordinates_list_before[index_list[j]];
			}
		}

	}

}
function enemy_detect(){
	for(let i = 0; i < ball_coordinates_list.length; i++){
		if(enemy_coordinates[0] == ball_coordinates_list[i][0] && enemy_coordinates[1] == ball_coordinates_list[i][1]){
			ball_coordinates_list[i] = ball_coordinates_list_before[i];
		}

	}
}
function enemy_overlap(){
	for(let i = 0; i < ball_coordinates_list.length; i++){
		if(enemy_coordinates_after[0] == ball_coordinates_list[i][0] && enemy_coordinates_after[1] == ball_coordinates_list[i][1]){
			collision = 1;
			break;
		}
		else{
			collision = 0;
		}
	}
}

function getAllIndexes(arr, val) {
	var indexes = [];
	for(i = 0; i < arr.length; i++)
		if (JSON.stringify(arr[i]) == JSON.stringify(val))
			indexes.push(i);
	return indexes;
}

function timer_loop(){
	if(timer !== 0){
		text(timer, 0, 0);
	}
	if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
	  timer--;
	}
	if (timer == 0) {
	  text("GAME OVER", 0, 0);
	}
}

function enemy_captured(){
	let right = getAllIndexes(ball_coordinates_list, [enemy_coordinates[0] + 1, enemy_coordinates[1]]).length > 0;
	let left = getAllIndexes(ball_coordinates_list, [enemy_coordinates[0] - 1, enemy_coordinates[1]]).length > 0;
	let up = getAllIndexes(ball_coordinates_list, [enemy_coordinates[0], enemy_coordinates[1] + 1]).length > 0;
	let down = getAllIndexes(ball_coordinates_list, [enemy_coordinates[0], enemy_coordinates[1] - 1]).length > 0;
	return right && left && up && down;
}
