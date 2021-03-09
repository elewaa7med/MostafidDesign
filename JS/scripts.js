var incrementValue = 1;
$("#right-arrow").click(function () {
    $(".nav-link").removeClass("active")
    $(".nav-fill .nav-item:nth-of-type("+incrementValue+") .nav-link").addClass("active")
    incrementValue++;
    $(".containt > .row").attr("style","display:none;")
    $(".containt > .row:nth-of-type("+incrementValue+")").attr("style","display:inline-flex;")
    // console.log($(".containt > .row:nth-of-type("+incrementValue+")"))
    if (incrementValue >= $(".containt > .row").length) {
        $("#right-arrow").attr("style", "visibility:hidden");
    } else if (incrementValue >= 0) {
        $("#left-arrow").attr("style", "visibility:visiable");
        $(".nav-fill").removeAttr("style");
    }
});

$("#left-arrow").click(function () {
    incrementValue--;
    console.log(incrementValue);
    $(".nav-link").removeClass("active")
    $(".nav-fill .nav-item:nth-of-type("+(incrementValue-1)+") .nav-link").addClass("active")
    $(".containt > .row").attr("style","display:none;")
    $(".containt > .row:nth-of-type("+incrementValue+")").attr("style","display:inline-flex;")
    if (incrementValue <= 1) {
        $("#left-arrow").attr("style", "visibility:hidden");
        $(".nav-fill").attr("style", "display:none");
    }else if (incrementValue <= $(".containt > .row").length) {
        $("#right-arrow").attr("style", "visibility:visiable");
    }
});

let dropArea = document.getElementById('drop-area');

$("#drop-area").click(function(){
    console.log("testings");
    $("#filelist").click();
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});
dropArea.addEventListener('drop', handleDrop, false);
function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    // handleFiles(files)
}

function handleFiles(files) {
    let sum = 0;
    ([...files]).forEach(function(file){
        console.log(file.size);
        sum = sum + file.size;
    });
    console.log(sum)
    if(Math.floor((sum/1024)/1024 > 20)){
        alert("max files size 20MB")
    }else{
        ([...files]).forEach(function(file){
            $('#filesName').append("<div class='col-md-5 fileshow'>"+file.name + "\t ("+ Math.ceil(file.size/1024) +" kb)</div>")
        });
    }
}

$(".stick").click(function(event){
    let value = $(event.currentTarget.parentNode.parentNode).attr("id");
    $("#" + value + " .stick").removeClass("active");
    $(event.currentTarget).addClass("active");
});

