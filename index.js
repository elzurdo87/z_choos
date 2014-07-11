var opciones ={};
function armar(){
    opciones ={};
    var wid = $('#wid').val();
    var hei = $('#hei').val();
    var displayFloat =$('#df').is(':checked');
    var maxResult=$('#mx').val();
    var placeHolder=$('#ph').val();
    var showSelected=$('#ss').is(':checked');
    var withCheck=$('#wc').is(':checked');
    var noResult=$('#nr').val();
    var striped=$('#st').is(':checked');            
    var cont=$('#ct').is(':checked'); 
    if(cont){
        $('#df').attr("disabled",true);
        $('#mx').attr("disabled",true);
        $('#ph').attr("disabled",true);
        $('#ss').attr("disabled",true);
        $('#wc').attr("disabled",true);
        $('#nr').attr("disabled",true);
        $('#st').attr("disabled",true);
        $('#botones').show();
        opciones.container=true;
    }else{
        $('#botones').hide();
        $('#df').removeAttr("disabled");
        if($('#df').is(":checked")){
            opciones.disp="inline";
        }
        $('#mx').removeAttr("disabled");
        if($('#mx').val()!=""){
            opciones.maxresult=maxResult;
        }
        $('#ph').removeAttr("disabled");
        if($('#ph').val()!=""){
            opciones.placeholder=placeHolder;
        }
        $('#ss').removeAttr("disabled");
        if($('#ss').is(":checked")){
            opciones.showSelected=showSelected;
        }
        $('#wc').removeAttr("disabled");
        if($('#wc').is(":checked")){
            opciones.wcheck=withCheck;
        }
        $('#nr').removeAttr("disabled");
        if($('#nr').val()!=""){
            opciones.noresult=noResult;
        }
        $('#st').removeAttr("disabled");
        if($('#st').is(":checked")){
            opciones.striped=striped;
        }
    }
    if(wid!=''){
        opciones.wid=wid+'px';
    }
    if(hei!=''){
        opciones.height_opt=hei+'px';
    }
}
function construir(){
    restituir();
    if(opciones.container){
        $('#brands_c').z_choos("init",opciones);
    }else{     
        $('#brands').z_choos("init",opciones);
    }
    dibujar(opciones);
}
function dibujar(opciones){
    $('#code').empty();
    $('#code').append("$('#your_select_id').z_choos('init',{");
    entro = false;
    $.each(opciones,function(k,v){
        entro = true;
        $('#code').append('<br>');
        t=null;
        if(k=="oclick"){
            t=k+": "+v+",";
        }else if(k == "maxresult"){
            t=k+": "+v+",";
        }else if(jQuery.type(v)==="number"){
            t=k+": '"+v+"',";
        }else if(jQuery.type(v)==="string"){
            t=k+": '"+v+"',";
        }else if(jQuery.type(v)==="boolean"){
            t=k+': '+v+',';
        }
        $('#code').append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+t);        
    });
    if(entro){
        $('#code').html($('#code').html().slice(0,-1));
    }
    $('#code').append('<br>');
    $('#code').append("});");
}

function agregar(key,val){
    g={id:key,name:val};
    v = [];
    v[0]=g;
    $('#brands_c').z_choos("add",v);
}
function restituir(){

        $('#brands_c').z_choos("destroy");
        $('#brands').z_choos("destroy");
        $('#brands_c').hide();
        $('#brands').hide();

}
