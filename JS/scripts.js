var baseUrl = "http://uramitsys-001-site5.htempurl.com/api";
var incrementValue = 1;
var hasfollow, enterPersonnel = false, enterDocuments = false;
$("#right-arrow").click(function () {
    switch (hasfollow) {
        case true:
            window.location.href = "../Pages/follow.html";
            break;
        case false:
            $(".nav-fill .nav-link").removeClass("active");
            $(".nav-fill .nav-item:nth-of-type(" + incrementValue + ") .nav-link").addClass("active");
            incrementValue++;
            $(".containt > .row").attr("style", "display:none;");
            $(".containt > .row:nth-of-type(" + incrementValue + ")").attr("style", "display:inline-flex;");
            if (incrementValue >= $(".containt > .row").length) {
                $("#right-arrow").attr("style", "visibility:hidden");
            } else if (incrementValue >= 0) {
                $("#left-arrow").attr("style", "visibility:visiable");
                $(".nav-fill").removeAttr("style");
            }

            if ($(".containt > .row:nth-of-type(" + incrementValue + ")").attr("id") == "personel-data-m"
                && enterPersonnel == false) {
                LoadApiPeronsalData();
                enterPersonnel = true;
            } else if ($(".containt > .row:nth-of-type(" + incrementValue + ")").attr("id") == "Documents-m"
                && enterDocuments == false) {
                LoadApiDocumentsData();
                enterDocuments = true;
            }
            break;
        default:
            alert("You have to choose Submit or Follow!");
            break;
    }
});

$("#left-arrow").click(function () {
    incrementValue--;
    console.log(incrementValue);
    $(".nav-fill .nav-link").removeClass("active")
    $(".nav-fill .nav-item:nth-of-type(" + (incrementValue - 1) + ") .nav-link").addClass("active")
    $(".containt > .row").attr("style", "display:none;")
    $(".containt > .row:nth-of-type(" + incrementValue + ")").attr("style", "display:inline-flex;")
    if (incrementValue <= 1) {
        $("#left-arrow").attr("style", "visibility:hidden");
        $(".nav-fill").attr("style", "display:none");
    } else if (incrementValue <= $(".containt > .row").length) {
        $("#right-arrow").attr("style", "visibility:visiable");
    }
});

let dropArea = document.getElementById('drop-area');

$("#drop-area").click(function () {
    $("#filelist").click();
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

dropArea.addEventListener('drop', handleDrop, false);
function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    handleFiles(files)
}

function handleFiles(files) {
    let sum = 0;
    $('#filesName').html("");
    ([...files]).forEach(function (file) {
        sum = sum + file.size;
    });
    if (Math.floor((sum / 1024) / 1024 > 20)) {
        alert("max files size 20MB")
    } else {
        ([...files]).forEach(function (file) {
            $('#filesName').append("<div class='col-md-5 fileshow'>" + file.name.substring(0, 9) + ".. \t (" + Math.ceil(file.size / 1024) + " kb) <meter min=1 max=10 value=10></meter></div>")
        });
    }
}

$(".stick").click(function (event) {
    let value = $(event.currentTarget.parentNode.parentNode).attr("id");
    $("#" + value + " .stick").removeClass("active");
    $(event.currentTarget).addClass("active");
    if (value == "start-request") {
        hasfollow = $(event.currentTarget).hasClass("follow")
    }
});

function submit() {
    $("#Confirmation .success").show();
    $.ajax({
        url: baseUrl + "/Request/save/" + $("#inputMobileNumber").val(),
        method: "Get",
        success: function (result) {
        }
    });
}

function LoadApiPeronsalData() {
    $.ajax({
        url: baseUrl + "/ApplicantData/loadpage",
        method: "Get",
        success: function (result) {
            if (result != null) {
                result.result.nationalty.forEach(function (element) {
                    $("#Nationality").append("<option value=" + element.Nationality_ID + ">" + element.Nationality_Name + "</option>")
                });

                result.result.Countries.forEach(function (element) {
                    $("#contries").append("<option value=" + element.Country_ID + ">" + element.Country_Name + "</option>")
                });

                result.result.type.forEach(function (element) {
                    $("#app-type").append("<option value=" + element.Applicant_Type_ID + ">" + element.Applicant_Type_Name + "</option>")
                });

                result.result.titles.forEach(function (element) {
                    $("#title").append("<option value=" + element.Title_Middle_Names_ID + ">" + element.Title_Middle_Names_Name + "</option>")
                });

                result.result.doctype.forEach(function (element) {
                    $("#DocId").append("<option value=" + element.Supporting_Documents_ID + ">" + element.Supporting_Documents_Name + "</option>")
                });
            }
        }
    });
}

function LoadApiDocumentsData() {
    $.ajax({
        url: baseUrl + "/Document/loadpage",
        method: "Get",
        success: function (result) {
            if (result != null) {
                result.result.provider.forEach(function (element) {
                    $("#provider").append("<option value=" + element.Provider_Academic_Services_ID + ">" + element.Provider_Academic_Services_Name + "</option>")
                });
                result.result.mainServices.forEach(function (element) {
                    $("#main-services").append("<option value=" + element.Main_Services_ID + ">" + element.Main_Services_Name + "</option>")
                });
                result.result.supporteddocs.forEach(function (element) {
                    $("#DocSupport").append("<option value=" + element.Supporting_Documents_ID + ">" + element.Supporting_Documents_Name + "</option>")
                });
            } else if (result == null) {
                $("#modelbody").append("No Data Added , try again later");
                $("#exampleModalCenter").modal("show");
            }
        }
    });
}

function selectSub() {
    $("#sub-services option").remove();
    $("#sub-services").append("<option disabled selected>Select ----------------</option>");
    $.ajax({
        url: baseUrl + "/Sub_Services/GetSubServices/" + $("#main-services").val(),
        method: "Get",
        success: function (result) {
            console.log(result);
            if (result != null) {
                $("#sub-services").removeAttr("disabled");
                result.result.forEach(function (element) {
                    $("#sub-services").append("<option value=" + element.Sub_Services_ID + ">" + element.Sub_Services_Name + "</option>")
                });
            } else if (result == null) {
                $("#modelbody").append("No Data Added , try again later");
                $("#exampleModalCenter").modal("show");
            }
        }
    });
}

// function DocSupportSleect() {
//     $("#DocSupport option").remove();
//     $("#DocSupport").append("<option disabled selected>Select ----------------</option>");
//     $.ajax({
//         url: baseUrl + "/Document/GetDocument/" + $("#main-services").val() + "/" + $("#sub-services"),
//         method: "Get",
//         success: function (result) {
//             console.log(result);
//             if (result != null) {
//                 $("#DocSupport").removeAttr("disabled");
//                 result.result.forEach(function (element) {
//                     $("#DocSupport").append("<option value=" + element.Sub_Services_ID + ">" + element.Sub_Services_Name + "</option>")
//                 });
//             } else if (result == null) {
//                 $("#modelbody").append("No Data Added , try again later");
//                 $("#exampleModalCenter").modal("show");
//             }
//         }
//     });
// }

function review() {
    $("#left-arrow").attr("style", "visibility:hidden");
    $("#ReviewMaster").removeAttr("style");
    $("#ReviewMaster2").removeAttr("style");
    for (var i = 2; i < 6; i++) {
        $(".containt > .row:nth-of-type(" + i + ")").attr("style", "display:inline-flex; margin-bottom:40px");
    }
    $(".containt > .row:nth-of-type(" + 6 + ")").attr("style", "display:none");
}

function confirm() {
    $("#ReviewMaster").attr("style", "display:none");
    $("#ReviewMaster2").attr("style", "display:none");
    for (var i = 2; i < 6; i++) {
        $(".containt > .row:nth-of-type(" + i + ")").attr("style", "display:none");
    }
    $(".containt > .row:nth-of-type(" + 6 + ")").removeAttr("style");
    $("#left-arrow").attr("style", "visibility:visable");
}

function AffiliatedState(){
    if(($("#Affiliated option:selected").text()).toLowerCase() == "yes"){
        $("#IAUID").removeAttr("disabled");
        var myModal = new bootstrap.Modal(document.getElementById('loginModel'), {
            keyboard: false
          })
          myModal.show()
    }else if(($("#Affiliated option:selected").text()).toLowerCase()){
        $("#IAUID").attr("disabled","disabled");
    }
}

$("#text-area").keyup(function(){
    $("#text-area-counter").text($(this).val().length+"/300")
    if($(this).val()){
        $(".insideTextArea").hide();
        $(".insideTextAreaCounter").show()
    }else if(!$(this).val()){
        $(".insideTextArea").show();
        $(".insideTextAreaCounter").hide()
    }
});
