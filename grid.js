var grid_size = 9;
var margin = 10;
var canvas_size = 600;
var ball_coordinates_list = [[0,0],[0,1],[1,2],[1,3]];
var ball_coordinates_list_before = [];

function setup(){
	createCanvas(canvas_size,canvas_size);
}

function draw(){
	background(255);
	for(var i = 0; i < grid_size; i++){
		line(margin + i * (canvas_size - 2 * margin)/(grid_size - 1), margin, margin + i * (canvas_size - 2 * margin)/(grid_size - 1), canvas_size - margin);
		line(margin, margin + i * (canvas_size - 2 * margin)/(grid_size - 1), canvas_size - margin, margin + i * (canvas_size - 2 * margin)/(grid_size - 1));
	}
	for(var i = 0; i < ball_coordinates_list.length; i++){
		var transformed_coords =  transformation(ball_coordinates_list[i]);
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
}

function keyPressed(){
	ball_coordinates_list_before = JSON.parse(JSON.stringify(ball_coordinates_list));
	if (keyCode === UP_ARROW && ball_coordinates_list[3][1] > 0) {
		ball_coordinates_list[3][1] -= 1;
	}
	if (keyCode === DOWN_ARROW && ball_coordinates_list[3][1] < grid_size - 1) {
		ball_coordinates_list[3][1] += 1;
	}
	if (keyCode === LEFT_ARROW && ball_coordinates_list[3][0] > 0) {
		ball_coordinates_list[3][0] -= 1;
	}
	if (keyCode === RIGHT_ARROW && ball_coordinates_list[3][0] < grid_size - 1) {
		ball_coordinates_list[3][0] += 1;
	}
	if (keyCode === 73 && ball_coordinates_list[2][1] > 0) {
		ball_coordinates_list[2][1] -= 1;
	}
	if (keyCode === 75 && ball_coordinates_list[2][1] < grid_size - 1) {
		ball_coordinates_list[2][1] += 1;
	}
	if (keyCode === 74 && ball_coordinates_list[2][0] > 0) {
		ball_coordinates_list[2][0] -= 1;
	}
	if (keyCode === 76 && ball_coordinates_list[2][0] < grid_size - 1) {
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
}

function transformation(coordinates){
	return [margin + coordinates[0] * (canvas_size - 2 * margin)/(grid_size - 1), margin + coordinates[1] * (canvas_size - 2 * margin)/(grid_size - 1)];
}

function collision_detect(){
	for (var i = 0; i < ball_coordinates_list.length; i++){
		if(ball_coordinates_list_before[i] == ball_coordinates_list[i]){
			console.log("collision detected");
			console.log(ball_coordinates_list[i], ball_coordinates_list_before[i]);
			ball_coordinates_list[i] = ball_coordinates_list_before[i];
		}
	}
}