$(document).ready(() => {
    //variables
    const $startBtn = $("#start");
    const $playBoard = $("#playBoard");
    let $level = $("#levelSelect").val();
    const $gameInfo =$(".gameInfo")
    let array2 = [];
    let $cnt=0;
    let $size =0;
    let $bombCount =0;

    
    //set game difficulty, bomb number and board size
    const difficulty = ($level) => {
        //console.log('w dific');
        console.log($level);
        typeof $level;
        if($level == 1){
            $size = 10;
            $bombCount =10;
         //   console.log('lev1');
        }
        else if($level == 2){
            $size = 15;
            $bombCount =20;
         //   console.log('lev2');
        }
        else if($level == 3){
            $size = 20;
            $bombCount =30;
        //console.log('lev3');
        }
    }
    //initialization help 2 dimension array and fill it with 0's
    const arrayInit = () =>{
        for(let i=0; i<$size+1; i++){
            array2[i] = [];
            for(let j=0; j<$size+1; j++){
                array2[i][j] = 0;
            }
        }
    }
    //bomb planting on board, ang generating number of bomb near
   const bombPlant = () =>{
        counter = $bombCount;
        while(counter){
           // console.log("w while");
            let x = Math.floor(Math.random() * $size);//pick random numbers of board
            let y = Math.floor(Math.random() * $size);
            if(array2[x][y] === 0){ //if no bomb place bomb
                array2[x][y] = 10;
                if(x>=1 && y>=0 && y<=10){ //ifs checking how many bomb are near(i need try write that simple)
                    if(array2[x-1][y] != 10) array2[x-1][y] += 1;
                    if(array2[x-1][y-1] != 10) array2[x-1][y-1] += 1;
                    if(array2[x-1][y+1] != 10) array2[x-1][y+1] += 1;
                   // console.log('if 1');
                }
                if(x<=10 && y>=0 && y<=10){ 
                    if(array2[x+1][y] != 10) array2[x+1][y] += 1;
                    if(array2[x+1][y-1] != 10) array2[x+1][y-1] += 1;
                    if(array2[x+1][y+1] != 10) array2[x+1][y+1] += 1;
                   // console.log('if 2');
                }
                if(y>=1){
                    if(array2[x][y-1] != 10) array2[x][y-1] += 1;
                   // console.log('if 3');
                }
                if(y<=10) {
                    if(array2[x][y+1] != 10) array2[x][y+1] += 1;
                   // console.log('if 4');
                }
            counter--;
            }
        }
   }
   //bomb placing
   //based on help array placing bomb icon, number of bomb near or empty field if no bomb near
   const bombPlacing = () => {
    for (var i=0; i<$size; i++) {
        var col = "";
        for (var j=0; j<$size; j++) { 
            let bomb ='';
            let clas;
            if(array2[i][j]===10){ 
                bomb = '<i class="fas fa-bomb"></i>';
                clas ='bomb';
            }
            else if(array2[i][j]===0) {
                bomb = '';
                clas='noBomb';
            }
            else {
                bomb = array2[i][j];
                clas ='nearBomb';
            }
                col += "<td><p class="+clas+">"+bomb+"</p></td>";
            }
            $playBoard.append("<tr>"+col+"</tr>");
      }
      $("p").css("color", "gray"); // hiding icons/number with set color same as background
   }

   const clearing = () =>{
        $startBtn.hide(); //hide start button
        $gameInfo.empty();// clear stuff
        $("tr").remove();
        $gameInfo.removeClass("text-danger text-success");
   }
   //game starting
    $startBtn.on('click', () => {
        $cnt=0;//cklick counter
        $level = $("#levelSelect").val(); // difficulty value from dropdown 1 easy, 2 medium, 3 hard
        clearing(); //clearing game infos
        difficulty($level); // set dificulty
      //  console.log($level);
      //  console.log($size);
      //  console.log($bombCount);
        arrayInit();
        bombPlant();
        bombPlacing();
        //clicking board event h
        $("p").click(function() {
            $(this).off('click'); //turn of click possible on clicked field
            $cnt++; //increase counter
            const clickedClass = this.className;
            $(this).css("color", "black");// change clicked color and background so icons are visible
            $(this).css("backgroundColor", "lightgray");
            //if clicked bomb stop game
            if (clickedClass==='bomb'){
                $gameInfo.append("Booooom! Game Over!")
                $gameInfo.addClass("text-danger")
                $('.bomb').css("color", "black");
                $('.bomb').css("backgroundColor", "lightgray");
                $("p").off('click');
                $($startBtn).show();//new game button show
            }
            //console.log($cnt);
            //if counter of click is equal of fields number minus bombs player won
            if ($cnt === (($size*$size)-$bombCount)){
                $gameInfo.append('Great Job! You Won')
                $gameInfo.addClass("text-success")
                $("p").off('click');
                $($startBtn).show();
            }
            
        });
   });


});