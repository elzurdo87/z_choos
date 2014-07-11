(function($) {
    
    function z_choos(){
        this._this=null;
        this._width=null;
        this._height_opt="100";
        this._selector=null;
        this._class=null;
        this._classBold="z_c_bold";
        this.__data_options=null;
        /** container*/
        this.__id_container=null;
        /** input field*/
        this.__id_input=null;
        /** field with results selected*/
        this.__id_result_selected=null;
        /** field where shows results*/
        this.__id_result_container=null;
        this.__id_result_c_container=null;
        /* */
        /** define is multiple choice */
        this._multiple=false;
        /** define funcionp para el click en un elemento */
        this._onclick=false;
        /** define el tipo de elemento */
        this._disp="float"; 
        /** cantidad maxima de resultados*/
        this._maxresult=false;    
        this._placeholder="";
        /** mensaje sin resultados*/
        this._no_result=false;
        /* continua mostrando elementos seleccionados */
        this._showSelected=false;
        /* muesta un check */
        this._with_check=false;
        /* a rayas uno gris uno blanco */
        this._striped=false;
        this._container=false;
        this._getWidth=function(){
            style={
                width:this._width
            }
            return style;
        }
        this._hide=function(){
            if((this._disp=="float")&&($('#'+this.__id_result_c_container).is(":visible"))){
                        $('#'+this.__id_result_c_container).hide();
            }
        }
        this._getMaxHeight=function(max){
            if(max){
                hei=this._height_opt-3;
                style={
                    "max-height":hei+"px"
                }
            }else{
                style={
                    height:this._height_opt+"px"
                }
            }
            return style;
        }
        this._init=function(attr){
            if(attr.hasOwnProperty("selec")){
                this._selector=attr.selec;
            }
            if(attr.hasOwnProperty("wid")){
                this._width=attr.wid;
            }
            if(attr.hasOwnProperty("height_opt")){
                this._height_opt=attr.height_opt.replace("px","");
           opciones
 }
            if(attr.hasOwnProperty("oclick")){
                if(typeof attr.oclick !== 'undefined' && $.isFunction(attr.oclick)){
                    this._onclick=attr.oclick;
                }else{
                    console.info(attr.oclick+" not is a function");
                }
            }
            if(attr.hasOwnProperty("disp")){
                this._disp=attr.disp;
            }
            if(attr.hasOwnProperty("wcheck")){
                if(this._disp=="float"){
                    this._with_check=false;
                }else{
                    this._with_check=attr.wcheck;
                }
            }
            if(attr.hasOwnProperty("maxresult")){
                this._maxresult=parseInt(attr.maxresult);
            }
            if(attr.hasOwnProperty("placeholder")){
                this._placeholder=attr.placeholder;
            }
            if(attr.hasOwnProperty("showSelected")){
                this._showSelected=attr.showSelected;
            }        
            if(attr.hasOwnProperty("striped")){
                this._striped=attr.striped;
            }
            if(attr.hasOwnProperty("noresult")){
                this._no_result=attr.noresult;
            }
            if(attr.hasOwnProperty("container")){
                this._container=attr.container;
            }
            $('#'+this._selector).addClass("z_choos");
            if(!this._container){
                this.__data_options=$('#'+this._selector+' option');    
            }                        
            this._multiple=$('#'+this._selector).prop("multiple");
        }
    };
    _methods={
        init: _init,            //inicia el z_choos
        get: _get,              //obtiene todos los seleccionados
        select_all: _s_all,     //selecciona todos los elementos mostrados
        unselect_all: _us_all,  //quita de la seleccion a todos los elementos seleccionados
        add: _ad,                //agrega un elemento en z_choos del tipo container
        destroy: _des
    }
    
    /** function para llamar tipo selector.function() */
    $.fn.z_choos=function(method,attr){
        if(typeof method==="string"){
            if(_methods[method]){
                if($(this).data("z_choos")){
                    ins=$(this).data("z_choos");
                }else{
                    id=$(this).prop('id');
                    if(id==""){
                        id="z_choos";
                        id=ckmkId(id);
                        $(this).attr("id",id);
                    }
                    v_param={
                        selec:id,
                        wid:this.width()
                    }
                    attre = $.extend(v_param,attr||{}); 
                    ins = new z_choos();
                    ins._init(attre);
                    $(this).data("z_choos",ins);
                }  
                if(method ==="add"){
                   return _methods[method](ins,attr);
                }else if(method ==="destroy"){
                    if($(this).data("z_choos")){
                        ins=$(this).data("z_choos");
                        $(this).removeData("z_choos");
                        return _methods[method](ins);
                    }
                }else{
                    return _methods[method](ins);
                }
            }else{
                console.error("metodo no definido");
            }
        }else{
           console.error("metodo no definido");
        }
    };   
    /** private */
    function ckmkId(id){
        if($('#'+id).length>0){
            id="z_choos"+i;
            i+=1;
             return ckmkId(id);
        }else{
            return id;
        }
    }
    function _init(zc){ 
        _start(zc);
    }
    function _ad(zc,items){    //recibe un array [{id:xx, name:"nana"},{id:xx, name:"nana"},{id:xx, name:"nana"}]
        if(zc._container){
            $.each(items,function(i,v){
                if(v.id === undefined && v.name === undefined){
                    console.info("Elemento no valido");
                }else{
                    _addOption(zc,v);

                }
            });
            if($('#'+zc.__id_result_selected+' li').length>0){
                $('#'+zc.__id_container).show();                
            }
        }else{
            console.error("the element not is a container");
        }
    }
    function _des(zc){
        $('#'+zc.__id_container).remove();
        $('#'+zc._selector+' option:selected').removeAttr("selected");
        $('#'+zc._selector).show();
    }
    function _get(zc){
        elements=[];
        i=0;
        $.each($('#'+zc.__id_result_selected+' li.z_choos_opt'),function(i,v){
            texto=$(v).text();
            val=$(v).children("a").attr("data-key");
            e={id:val,name:texto}
            elements[i]=e;
            i=i+1;
        });
        return elements;
    }
    function _s_all(zc){ // seleccionara todos los que estan visibles o cargados
        if(zc._with_check){
            $('#'+zc.__id_result_container+' li.z_choos_li_opt input').trigger("click")
        }else{
            $('#'+zc.__id_result_container+' li.z_choos_li_opt').trigger("click")    
        }  
        _poblate(zc,null);
    }
    function _us_all(zc){// de-seleccionar todos los que estan seleccionados
        $('#'+zc.__id_result_selected+' li.z_choos_opt a').trigger("click")
    }
    function _make_id(zc){
        zc.__id_container="z_d_"+zc._selector;
        zc.__id_input="z_i_"+zc._selector;
        zc.__id_result_container="z_rc_"+zc._selector;
        zc.__id_result_c_container="z_rc_c_"+zc._selector;
        zc.__id_result_selected="z_rs_"+zc._selector;        
    }
    function _construct(zc){
        if($('#'+zc.__id_container).length===0){            
            $('#'+zc._selector).after('<div id='+zc.__id_container+' ></div>');
            $('#'+zc.__id_container).css(zc._getWidth()).hide();            
            $('#'+zc.__id_container).append('<ul id='+zc.__id_result_selected+' class="z_choos_ul"></ul>');
            if(!zc._container){
                $('#'+zc.__id_container).show();
                $('#'+zc.__id_result_selected).append('<li class="z_choos_input"><input id='+zc.__id_input+' autocomplete="off" placeholder="'+zc._placeholder+'" type="text"/></li>');
                $('#'+zc.__id_container).append('<div id='+zc.__id_result_c_container+' class="z_choos_container"><ul id='+zc.__id_result_container+' class="z_choos_ul z_choos_scr" ></ul></div>');
                $('#'+zc.__id_result_c_container).css(zc._getMaxHeight(false));
                $('#'+zc.__id_result_container).css(zc._getMaxHeight(true));
                if(zc._disp==="float"){
                    $('#'+zc.__id_result_c_container).hide();
                    $('#'+zc.__id_result_c_container).css(zc._getWidth());
                    $('#'+zc.__id_result_c_container).css({position:"absolute"});
                }
            }
        }
    }
    function _start(zc){
        _make_id(zc);
        _construct(zc);
        if(!zc._container){
            _poblate(zc,null);
            _loadEvents(zc,true);
        }
    }
    function _contain(contenido, filtro){
        if(contenido.toLowerCase().indexOf(filtro.toLowerCase()) >= 0){
            return true;
        }else{
            return false;
        }
    }
    function _highlight(zc,texto_o,needle){   
        texto=texto_o.toLowerCase();
        id_o=texto.indexOf(needle.toLowerCase());
        needle_len=needle.length;
        needle_texto = texto_o.substr(id_o,needle_len);
        var res = texto_o.replace(needle_texto, '<span class="'+zc._classBold+'">'+needle_texto+'</span>');
        return res;
    }
    function _poblate(obj_z_choos, filter){
        $('#'+obj_z_choos.__id_result_container).empty();elem=0;float=false;
        if(obj_z_choos._disp==="float"){float=true;}
        c_filter=false;
        for(key in obj_z_choos.__data_options){if(obj_z_choos.__data_options.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key)){
            v=obj_z_choos.__data_options[key];
            add=true;
            c_filter=false;
            if(filter !== null){
                c_filter=true;
                if(_contain(v.text,filter)){
                add=true;}else{add=false;}}
            opt='<li data-id="'+v.value+'" class="z_choos_li_opt';
            if(float && elem ===0){opt+= ' z_d_mark';}selected=false;
            if($('#'+obj_z_choos.__id_result_selected+' li.z_choos_opt a[data-key="'+v.value+'"]').length > 0 ){
                opt+=' z_d_seled';selected=true;}
            if(obj_z_choos._striped && elem%2===0){
                opt+=' z_d_back">';}else{opt+='">';}
            if(obj_z_choos._disp==="inline"){                    
                if(obj_z_choos._with_check){
                    opt+='<input type="checkbox" data-id="c'+v.value+'" ';
                    if(selected){opt+=' checked>';}else{opt+=' >';}}}
            text_show=v.text;
            if(c_filter){text_show=_highlight(obj_z_choos,text_show,filter);}opt+='<span>'+text_show+'</span>';opt+='</li>'
            if(add){if(!obj_z_choos._showSelected && selected){}else{$('#'+obj_z_choos.__id_result_container).append(opt);
                    elem+=1;}opt=null;add=false;}
            max_cant=false;
            if(obj_z_choos._maxresult && elem===obj_z_choos._maxresult){max_cant=true;
                if(c_filter){_loadEvents(obj_z_choos,false);}   
                return;
            }
        }}
        if(c_filter && !max_cant){_loadEvents(obj_z_choos,false);}
        if(elem==0){if(obj_z_choos._no_result){opt='<li>'+obj_z_choos._no_result+'</li>';}else{
                opt='<li>No result</li>';}
            $('#'+obj_z_choos.__id_result_container).append(opt);opt =null;
        }
    }
    function _loadEvents(zc,full){
        /*evento escritura*/
        if(full){
            $('#'+zc.__id_result_selected).on("click",zc,function(e){
                $('#'+e.data.__id_input).focus();
                e.stopPropagation();

                
            })
            $('#'+zc.__id_input).on("keyup",zc,function(e){ 
                keyNum=e.keyCode;
                if(keyNum != 40 && keyNum != 39 && keyNum != 38 && keyNum != 37 && keyNum != 13){  
                    $('#'+e.data.__id_result_c_container).show();
                    _poblate(e.data,$(this).val());   
                    $('#'+e.data.__id_result_container).scrollTop(0);
                }
            });
            $('#'+zc.__id_input).on("focusin",zc,function(e){ 
                if((e.data._disp=="float")&&$('#'+e.data.__id_result_c_container).is(":hidden")){
                    $('#'+e.data.__id_result_c_container).show();
                }
                e.stopPropagation();
            });
            $('#'+zc.__id_input).on("focusout",zc,function(e){ 
                if((e.data._disp=="float") && $('#'+e.data.__id_result_c_container).is(":visible")&& !$('#'+e.data.__id_result_c_container).is(":hover")){
                    $('#'+e.data.__id_result_c_container).hide();
                }
                e.stopPropagation();
            });           
                $('#'+zc.__id_input).bind("keydown",zc,function(e){ 
                    var keyNum= e.keyCode;
                    switch (keyNum){ 
                        
                        //enter
                        case 13:
                           e.preventDefault();
                            if(!zc._with_check){
                                if(!$('#'+e.data.__id_result_c_container).is(":hidden")){
                                    $('#'+e.data.__id_result_container+' li.z_choos_li_opt.z_d_mark').trigger("click");
                                }
                            }
                           break;
                        //abajo
                        case 40:
                            e.preventDefault(); 
                            if($('#'+e.data.__id_result_container+' li.z_choos_li_opt.z_d_mark').next().length>0){
                                $('#'+e.data.__id_result_container+' li.z_choos_li_opt.z_d_mark').removeClass("z_d_mark").next().addClass("z_d_mark");
                            }
                            _moveScroll(e.data,"down");
                            break;
                        //arriba
                        case 38:
                            e.preventDefault();
                            if($('#'+e.data.__id_result_container+' li.z_choos_li_opt.z_d_mark').prev().length>0){
                                $('#'+e.data.__id_result_container+' li.z_choos_li_opt.z_d_mark').removeClass("z_d_mark").prev().addClass("z_d_mark");
                            }
                            _moveScroll(e.data,"up");
                            break;
                        //backspace
                        case 8:   
                            if($('#'+e.data.__id_input).val().length == 0){
                                e.preventDefault();
                                $('#'+e.data.__id_result_selected+' .z_choos_opt a').last().trigger("click");
                                _poblate(e.data, $('#'+e.data.__id_input).val());
                            }
                            break;
                        default:    
                    }
                });
//            }
        }
            /* si definio check, evento para los check */
            if(zc._with_check){
                $('#'+zc.__id_result_container+' :checkbox').on("change",zc,function(e){
                    e.stopPropagation();
                    if(e.target.checked){
                        _addSelected(e.data,this);
                        if(e.data._showSelected){
                            $(this).parent().addClass("z_d_seled");
                        }else{
                            $(this).parent().hide();                        
                        }
                    }else{
                        _delSelected(e.data,$(this).parent().attr("data-id"));
                    }
                });
                $('#'+zc.__id_result_container+' .z_choos_li_opt').on("click",zc,function(e){
                    e.stopPropagation();
                    if(e.target.type!="checkbox"){
                        if(e.data._onclick){
                            $(e.data._onclick(this))
                        }
                    }
                });
            }else{
                $('#'+zc.__id_result_container+' .z_choos_li_opt').on("click",zc,function(e){
                    e.stopPropagation();
                    if(e.data._multiple){
                        if(!$(this).hasClass("z_d_seled")){
                            _addSelected(e.data,this);
                            if(e.data._showSelected){
                                $(this).addClass("z_d_seled");
                            }else{
                                $(this).hide();
                            }
                            if(e.data._onclick){
                                $(e.data._onclick(this))
                            }                            
                        }
                    }else{
                        if($('#'+e.data.__id_result_selected+' .z_choos_opt').length > 0){}else{
                            _addSelected(e.data,this);
                            if(e.data._showSelected){
                                $(this).addClass("z_d_seled");
                            }else{
                                $(this).hide();                        
                            }
                            _poblate(e.data, $('#'+e.data.__id_input).val());
                            if(e.data._onclick){
                                $(e.data._onclick(this))
                            }
                        }
                    }
                    if(e.data._disp=="float"){
                        $('#'+e.data.__id_result_c_container).hide();
                    }
                });

                $('#'+zc.__id_result_container+' .z_choos_li_opt').on("mouseover",zc,function(e){
                    e.stopPropagation();
                    $('#'+e.data.__id_result_container+' .z_choos_li_opt').removeClass("z_d_mark");
                    $(this).addClass("z_d_mark");
                });

            }
    }  
    function _addOption(zc,item){
        if($('#'+zc._selector+' option[value="'+item.id+'"]').length>0){
            
        }else{
            $('#'+zc._selector).append('<option value='+item.id+'>'+item.name+'</option>');
        }
        $('#'+zc._selector+' option[value="'+item.id+'"]').attr("selected",true);
        if($('#'+zc.__id_result_selected+' .z_choos_opt_rem[data-key="'+item.id+'"]').length>0){        
        }else{
            var opt= '<li class="z_choos_opt"><span>'+item.name+
                    '</span><a class="z_choos_opt_rem" data-key="'+item.id+
                    '"><span class="glyphicon glyphicon-remove"></span></a></li>';
            $('#'+zc.__id_result_selected).append(opt);
            $('#'+zc.__id_result_selected+' .z_choos_opt_rem[data-key="'+item.id+'"]').on("click",function(e){
                    e.stopPropagation();
                    key=$(this).attr("data-key");
                    _delSelected(zc,key);
                });
        }
    }
    function _addSelected(obj_z_choos,opc){
        if(obj_z_choos._with_check){
            text = $(opc).parent().text();
            key = $(opc).parent().attr("data-id");
        }else{
            key =$(opc).attr("data-id");
            text=$(opc).text();
        }
        var opt= '<li class="z_choos_opt"><span>'+text+
                '</span><a class="z_choos_opt_rem" data-key="'+key+
                '"><span class="glyphicon glyphicon-remove"></span></a></li>';
        $(opt).insertBefore('#'+obj_z_choos.__id_result_selected+' .z_choos_input');
        $('#'+obj_z_choos._selector+' option[value="'+key+'"]').attr("selected",true);
        //$('#'+this._selector)
        if(!obj_z_choos._multiple){
            $('#'+obj_z_choos.__id_result_selected+' li.z_choos_opt').width("95%");
            $('#'+obj_z_choos.__id_result_selected+' li.z_choos_input').hide();
            $('#'+obj_z_choos.__id_result_container+' :checkbox').attr('disabled',true);
        }
        $('#'+obj_z_choos.__id_result_selected+' .z_choos_opt_rem[data-key="'+key+'"]').on("click",function(e){
            e.stopPropagation();
            key=$(this).attr("data-key");
            _delSelected(obj_z_choos,key);            
        });
        if(!obj_z_choos._with_check && !obj_z_choos._multiple){
            _poblate(obj_z_choos, $('#'+obj_z_choos.__id_input).val());
        }
    }
    function _delSelected(obj_z_choos,key){
        $('#'+obj_z_choos.__id_result_selected+' .z_choos_opt_rem[data-key="'+key+'"]').parent().remove();
        if(obj_z_choos._container){
            if($('#'+obj_z_choos.__id_result_selected+' .z_choos_opt_rem').length==0){
                $('#'+obj_z_choos.__id_container).hide();
            }
        }else{
            $('#'+obj_z_choos.__id_result_container+' :checkbox').attr('disabled',false);    
            $('#'+obj_z_choos.__id_result_selected+' li.z_choos_input').show();
            $('#'+obj_z_choos.__id_result_container+' li[data-id="'+key+'"]').removeClass("z_d_seled");
            $('#'+obj_z_choos.__id_result_container+' li[data-id="'+key+'"] :checkbox').removeAttr("checked");
            _poblate(obj_z_choos, $('#'+obj_z_choos.__id_input).val());
        }                       
        $('#'+obj_z_choos._selector+' option[value="'+key+'"]').removeAttr("selected");
    }
    function _moveScroll(obj_z_choos,sentido){
        height_contenedor=$('#'+obj_z_choos.__id_result_container).height();
        pos_contenedor=$('#'+obj_z_choos.__id_result_container).offset().top;
        pos_scrol=$('#'+obj_z_choos.__id_result_container).scrollTop();
        if($('#'+obj_z_choos.__id_result_container+' li.z_choos_li_opt.z_d_mark').length>0){
            offtop=$('#'+obj_z_choos.__id_result_container+' li.z_choos_li_opt.z_d_mark').offset().top;
            postop=$('#'+obj_z_choos.__id_result_container+' li.z_choos_li_opt.z_d_mark').offset().top;
            if(sentido == "down"){
                alt_yo=$('#'+obj_z_choos.__id_result_container+' li.z_choos_li_opt.z_d_mark').height();
                hei=(height_contenedor+pos_contenedor);
                if((offtop+alt_yo) >= hei){
                    $('#'+obj_z_choos.__id_result_container).scrollTop(pos_scrol +alt_yo);
                }
            }else if(sentido == "up"){
                alt_ant=$('#'+obj_z_choos.__id_result_container+' li.z_choos_li_opt.z_d_mark').prev().height();
                if(alt_ant == null){
                    alt_ant =0;
                }
                if((offtop+10) < pos_contenedor){
                    if(alt_ant == 0){
                        $('#'+obj_z_choos.__id_result_container).scrollTop(0);
                    }else{
                        $('#'+obj_z_choos.__id_result_container).scrollTop(pos_scrol - alt_ant);
                    }
                }
            }
        }else{
            $('#'+obj_z_choos.__id_result_container+' li.z_choos_li_opt:first-child').addClass("z_d_mark");
        }
    }
    
})(jQuery);
