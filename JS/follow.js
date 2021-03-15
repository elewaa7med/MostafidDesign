$(".containt2 input.search").click(function (element) {
    if (!$(element.currentTarget).val()) {
        $(".containt2 input.search").each(element => {
            if (!$(".containt2 input.search:eq(" + element + ")").val()) {
                $(".containt2 input.search:eq(" + element + ")").focus();
                return false;
            }
        });
    }
});

$(".containt2 input.search").keyup(function (element) {
    $(".containt2 input.search").each(element => {
        if (!$(".containt2 input.search:eq(" + element + ")").val()) {
            $(".containt2 input.search:eq(" + element + ")").focus();
            return false;
        }
    });

    if (element.key == "Enter") {
        var requestid = "";
        $(".containt2 input.search").each(element => {
            requestid = requestid + $(".containt2 input.search:eq(" + element + ")").val();
        });
        if(requestid.trim().length == 12){
            $(".containt2 .row .col-md-12:nth-of-type(3)").css("display", "block");
        }else{
            alert("You enter Invalid Requesd Number!");
        }
    }
});

