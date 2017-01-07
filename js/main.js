
var canvas, ctx,
    text, author, color, opacity, textX, picture_base64, font_size = 100;

var LETTER_SPACING = 20;
var PADDING_SIDE = 200;


function init () {

    //init canvas
    canvas = document.getElementById('cvs');
    canvas.style.width = canvas.width
    canvas.style.height = canvas.height
    ctx = canvas.getContext('2d');

    // elem
    $text = document.getElementById('text');
    $valid = document.getElementById('valid');
    $color = document.getElementById('color');
    $download = document.getElementById('download');
    $file = document.getElementById('file');
    $author = document.getElementById('author');
    $font_up = document.getElementById('font_up');
    $font_down = document.getElementById('font_down');
    $random = document.getElementById('random');
    $opacity = document.getElementById('range');

    // set default value
    text = $text.value;
    author = $author.value;
    color = hexToRgb($color.value);
    opacity = $opacity.value/100;
    textX = 0;

    bind();
    draw();
}

function update(){
    update_picture();
}


function update_picture(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // if there is an image, draw it again, else draw without image
    if (picture_base64) {
        var image = new Image();
        image.onload = function() {
            drawImageScaled(image, ctx)
            draw()
        };
        image.src = picture_base64; 
    } else {
        draw();
    }
}

function bind () {


    //download image
    $download.onclick = function(e){
        var dt = canvas.toDataURL('image/jpeg');
        this.href = dt;

        var $form = $('#form');        

      
        $.ajax({
            url: $form.attr('action'),
            type: 'post',
            data: data = {dt},
            success: function (response) {
                // La réponse du serveur
            }
        });


    }

    //update field
    $text.onkeyup =  function(e) {
        text = $text.value;
        update();
    }
    $author.onkeyup = function(e) {
        author = $author.value;
        update();
    }

    $(document).on('keydown', function(e){
        console.log("yolo");

        if (e.keyCode== 38) {
            e.preventDefault();
            textX -= 10;
            update();
        }

        if (e.keyCode== 40) {
            e.preventDefault();
            textX += 10; 
            update();
        }
    })

    $color.onchange = function(e) {
        color = hexToRgb($color.value);
        update();
    }

    $opacity.onchange = function(e) {
        opacity = $opacity.value/100;
        update();
    }

    $font_up.onclick = function(){
       font_size +=   5; 
        update();
    }

    $font_down.onclick = function(){
       font_size -=  5; 
        update();  
    }

    $random.onclick = function(){
        $.ajax({
          url: "http://quotesapi.benjaminbeguin.com/api/v1/quotes/random",
            error: function() {
                alert('error serveur')
            },
            success: function(data) {
                author = data.data.author
                text = data.data.content
                $text.value = text;
                $author.value = author;
                update_picture();
            },
            type: 'GET'
        });
    }

    $file.onchange = function(){
        previewImageUploaded(this);
    } 
}


function draw () {
    if (!picture_base64) {
        ctx.fillStyle = '#ffffff';    
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", "+opacity+")" ;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign="center"; 
    ctx.fillStyle = '#ffffff';    
    wrapText();
}


function wrapText() {

    var fontSize = font_size,
        width = canvas.width - PADDING_SIDE,
        lines = [],
        line = '',
        lineTest = '',
        words = text.split(' '),
        currentY = 0,
        totalHeight = 0,
        centerY = 0;
    
    ctx.font = fontSize + 'px Arial';
      
    for (var i = 0, len = words.length; i < len; i++) {
      lineTest = line + words[i] + ' ';
        // Check total width of line or last word
        if (ctx.measureText(lineTest).width > width) {
            // Calculate the new height
            currentY = lines.length * fontSize + fontSize ;

            // Record and reset the current line
            lines.push({ text: line, height: currentY });
            line = words[i] + ' ';
        } else {
            line = lineTest;
        }
    }
    
    // Catch last line in-case something is left over
    if (line.length > 0) {
        currentY = lines.length * fontSize + fontSize;
        lines.push({ text: line.trim(), height: currentY });
        totalHeight = currentY;
        centerY = (canvas.height - totalHeight)/2 ;
    }

    // Visually output text

    ctx.shadowColor = "#515151";
    ctx.shadowOffsetX = 1; 
    ctx.shadowOffsetY = 1; 
    ctx.shadowBlur = 0;
    for (var i = 0, len = lines.length; i < len; i++) {
      canvas_text = ctx.fillText(lines[i].text, canvas.width/2, textX + lines[i].height + centerY + LETTER_SPACING*i);
    }

    ctx.font = 30 + 'px Arial';
    ctx.fillText(author, canvas.width/2, textX + lines[lines.length - 1].height + centerY + 50 + LETTER_SPACING * lines.length - 1 );


}

  
onload = init;
