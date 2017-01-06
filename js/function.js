function slugMe (value) {    
    var rExps=[
        {re:/[\xC0-\xC6]/g, ch:'A'},
        {re:/[\xE0-\xE6]/g, ch:'a'},
        {re:/[\xC8-\xCB]/g, ch:'E'},
        {re:/[\xE8-\xEB]/g, ch:'e'},
        {re:/[\xCC-\xCF]/g, ch:'I'},
        {re:/[\xEC-\xEF]/g, ch:'i'},
        {re:/[\xD2-\xD6]/g, ch:'O'},
        {re:/[\xF2-\xF6]/g, ch:'o'},
        {re:/[\xD9-\xDC]/g, ch:'U'},
        {re:/[\xF9-\xFC]/g, ch:'u'},
        {re:/[\xC7-\xE7]/g, ch:'c'},
        {re:/[\xD1]/g, ch:'N'},
        {re:/[\xF1]/g, ch:'n'} ];

    for(var i=0, len=rExps.length; i < len; i++) {
        value=value.replace(rExps[i].re, rExps[i].ch);

        return value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/\-{2,}/g,'-');
    }
};

function convertFileToDataURLviaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function previewImageUploaded (context) {

    if(context.files && context.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {  

            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 0, 0);
                draw()
            };
            image.src = e.target.result; 
            picture_base64 = e.target.result;

        }
        reader.readAsDataURL(context.files[0]);
    }
}