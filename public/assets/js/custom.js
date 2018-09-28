function notify(title,message,from, align, icon, type, animIn, animOut){
    $.growl({
        icon: icon,
        title: title,
        message: message,
        url: ''
    },{
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement: {
                    from: from,
                    align: align
            },
            offset: {
                x: 20,
                y: 85
            },
            spacing: 10,
            z_index: 1031,
            delay: 2500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: false,
            animate: {
                    enter: animIn,
                    exit: animOut
            },
            icon_type: 'class',
            template: '<div data-growl="container" class="alert" role="alert">' +
                            '<button type="button" class="close" data-growl="dismiss">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '<span class="sr-only">Close</span>' +
                            '</button>' +
                            '<span data-growl="icon"></span>' +
                            '<span data-growl="title"></span>' +
                            '<span data-growl="message"></span>' +
                            '<a href="#" data-growl="url"></a>' +
                        '</div>'
    });
};

function ValidacionCampos(id_divError,id_divParent){
    var estaValidado = true;

    // validar campos de texto requeridos
    $((id_divParent!= undefined?"#"+id_divParent:'')+" input").each(function(){
        if ($(this).hasClass("required")){
            if($.trim($(this).val()).length == 0){
                estaValidado = false;
                $(this).css("border-color","red");
            }else{
                $(this).css("border-color","");
            }
        }
    });

     // validar areas de textos requeridos
     $((id_divParent!= undefined?"#"+id_divParent:'')+" textarea").each(function(){
        if ($(this).hasClass("required")){
            if($.trim($(this).val()).length == 0){ 
                estaValidado = false;
                $(this).css("border-color","red");
            }else{
                $(this).css("border-color","");
            }
        }
    });

    // validar combos requeridos
    $((id_divParent!= undefined?"#"+id_divParent:'')+" select").each(function(){
        if ($(this).hasClass("required")){
            if($.trim($(this).val()).length == 0){ 
                estaValidado = false;
                $(this).focus();
                $(this).css("border-color","red");
            }else{
                $(this).css("border-color","");
            }
        }
    });

    if (!estaValidado) { 
        $('#'+(id_divError||'divErrors')).html('<p>Es necesario llenar todos los campos requeridos marcados con rojo</p>')
        $('#'+(id_divError||'divErrors')).removeClass("hidden")
    }else{
        $("#divErrors").addClass("hidden") 
    }

    return estaValidado;
 }

 function run_waitMe(el, num, effect,ptext){
    text = ptext!=undefined?ptext:"Espere un momento, estamos cargando los datos...";
    fontSize = '';
    switch (num) {
        case 1:
        maxSize = '';
        textPos = 'vertical';
        break;
        case 2: 
        maxSize = 30;
        textPos = 'vertical';
        break;
        case 3:
        maxSize = 30;
        textPos = 'horizontal';
        fontSize = '18px';
        break;
    }
    el.waitMe({
        effect: effect,
        text: text,
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: maxSize,
        waitTime : -1,
        textPos: textPos,
        fontSize: fontSize,
        onClose: function(el) {}
    });
}
 

$(document).on('hidden.bs.modal', function (event) { 
    if ($('.modal:visible').length) {
      $('body').addClass('modal-open');
    }
});
 

 window.alert = function() {};
  

 