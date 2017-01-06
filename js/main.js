
var canvas, ctx,
    text,label, color, picture_base64;

var LETTER_SPACING = 40;
var PADDING_SIDE = 200;

function init () {
    canvas = document.getElementById('cvs');

    canvas.style.width = canvas.width
    canvas.style.height = canvas.height
    ctx = canvas.getContext('2d');

    $text = document.getElementById('text');
    $label = document.getElementById('label');
    $valid = document.getElementById('valid');
    $color = document.getElementById('color');
    $download = document.getElementById('download');

    text = $text.value;
    label = $label.value;
    color = $color.value;

    bind();
    draw();
}

function bind () {
    $download.onclick = function(e){
        var dt = canvas.toDataURL('image/jpeg');
        this.href = dt;
    }

    $valid.onclick = function(e) {
        text = $text.value;
        label = $label.value;
        color = $color.value;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}


function draw () {
    var picture_url = "http://drscdn.500px.org/photo/153313177/m%3D2048_k%3D1_a%3D1/<76c5083f3a929889b34e46459eb5c069></76c5083f3a929889b34e46459eb5c069>";

    
    var imageUrl = picture_url;
    var convertFunction = convertFileToDataURLviaFileReader(imageUrl, function(base64Img){
        picture_base64 = base64Img;

        var image = new Image();
        image.onload = function() {
            ctx.drawImage(image, 0, 0);
        };

        image.src = picture_base64;

    })


    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign="center"; 
    ctx.fillStyle = '#ffffff';    
    wrapText();

}


function wrapText() {

    var fontSize = 120,
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
            currentY = lines.length * fontSize + fontSize;

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
        lines.push({ text: line.trim(), height: currentY + LETTER_SPACING });
        totalHeight += currentY;
        centerY = (canvas.height - canvas.height/3 - totalHeight)/2;
    }

    // Visually output text
    for (var i = 0, len = lines.length; i < len; i++) {
      ctx.fillText(lines[i].text, canvas.width/2, lines[i].height + centerY);
    }
}

  
onload = init;
