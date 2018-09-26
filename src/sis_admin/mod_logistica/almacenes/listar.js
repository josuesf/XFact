var empty = require('empty-element');
var yo = require('yo-yo');
import {NuevoAlmacen} from './agregar'

import {URL} from '../../../constantes_entorno/constantes'


function Ver(almacenes, paginas,pagina_actual, _escritura,tipo_almacenes) {

    var tab = yo`
    <li class=""><a href="#tab_listar_almacenes_2" data-toggle="tab" aria-expanded="false" id="id_tab_listar_almacenes_2">Almacenes<a style="padding-left: 10px;font-size:15px" onclick=${()=>CerrarTab()}><i class="zmdi zmdi-close"></i></a></a></li>`

    var el = yo`
    <div class="tab-pane" id="tab_listar_almacenes_2">
        <section class="content-header">
        <div class="modal modal-danger fade" id="modal-danger" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">¿Esta seguro que desea eliminar este almacen?</h4>
                    </div>
                    <div class="modal-body">
                        <p>Al eliminar el almacen no podra recuperarlo. Desea continuar de todas maneras?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" id="btnEliminar" data-dismiss="modal">Si,Eliminar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
          
        </section>
        <section class="content">
            <div class="card">
                <div class="card-head">
                    <header>Lista de Almacenes</header>
                    <div class="tools">
                    <div class="btn-group">
                    ${_escritura ? yo`<a onclick=${()=>NuevoAlmacen(_escritura, tipo_almacenes)} class="btn btn-info pull-right">
                        <i class="fa fa-plus"></i> Nuevo Almacen</a>`: yo``}
                    </div>
                    </div>
                </div> 
                <div class="card-body">
                    <div class="table-responsive">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripcion</th>
                                <th>Almacen</th>
                                <th>Tipo</th>
                                <th>Principal?</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${almacenes.map(u => yo`
                            <tr>
                                <td>${u.Cod_Almacen}</td>
                                <td>${u.Des_Almacen}</td>
                                <td>${u.Des_CortaAlmacen}</td>
                                <td>${u.Nom_TipoAlmacen}</td>
                                <td>${u.Flag_Principal?'Si':'No'}</td>
                                <td>
                                    ${_escritura ? yo`<button class="btn btn-xs btn-success" onclick="${()=>NuevoAlmacen(_escritura,tipo_almacenes, u)}"><i class="fa fa-edit"></i></button>` : yo``}
                                    ${_escritura ? yo`<button class="btn btn-xs btn-danger" data-toggle="modal" data-target="#modal-danger" onclick="${()=>Eliminar(_escritura, u)}"><i class="fa fa-trash"></i></button>` : yo``}
                                </td>
                            </tr>`)}
                        </tbody>
    
                    </table>
                    </div>
                    <div class="card-actionbar">
                        <ul class="pagination pagination-sm no-margin pull-right">
                            <li>
                                <a href="javascript:void(0);" onclick=${()=>(pagina_actual>0)?ListarAlmacenes(_escritura,pagina_actual-1):null}>«</a>
                            </li>
                            ${((new Array(paginas)).fill(0)).map((p, i) => yo`<li class=${pagina_actual==i?'active':''}>
                            <a href="javascript:void(0);" onclick=${()=>ListarAlmacenes(_escritura,i)} >${i + 1}</a>
                            </li>`)}
                        
                            <li>
                                <a href="javascript:void(0);" onclick=${()=>(pagina_actual+1<paginas)?ListarAlmacenes(_escritura,pagina_actual+1):null}>»</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>`
    //var main = document.getElementById('main-contenido');
    //empty(main).appendChild(el);
    if($("#tab_listar_almacenes_2").length){  

        $('#tab_listar_almacenes_2').remove()
        $('#id_tab_listar_almacenes_2').parents('li').remove()

        $("#tabs").append(tab) 
        $("#tabs_contents").append(el)
    }else{
        $("#tabs").append(tab) 
        $("#tabs_contents").append(el)
    } 
    $("#id_tab_listar_almacenes_2").click()
}


function CerrarTab(){
    $('#tab_listar_almacenes_2').remove()
    $('#id_tab_listar_almacenes_2').parents('li').remove()
    var tabFirst = $('#tabs a:first'); 
    tabFirst.tab('show'); 
}

function Eliminar(_escritura, almacen){
    
    var btnEliminar = document.getElementById('btnEliminar')
    btnEliminar.addEventListener('click', function Eliminar(ev) {
        run_waitMe($('#main-contenido'), 1, "ios","Eliminando...");
        var Cod_Almacen = almacen.Cod_Almacen
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Cod_Almacen,
            })
        }
        fetch(URL+'/almacenes_api/eliminar_almacen', parametros)
            .then(req => req.json())
            .then(res => {
                
                if (res.respuesta == 'ok') {
                    ListarAlmacenes(_escritura)
                    this.removeEventListener('click', Eliminar)
                }
                else{
                    console.log('Error')
                    this.removeEventListener('click', Eliminar)
                }
                $('#main-contenido').waitMe('hide');
            }).catch(function (e) {
                console.log(e);
                swal("Error!",'Ocurrio un error en la conexion o al momento de cargar los datos.  Tipo error : '+e, "error")
                $('#main-contenido').waitMe('hide');
            });
    })
}

function ListarAlmacenes(escritura,NumeroPagina) {
    run_waitMe($('#main-contenido'), 1, "ios");
    var _escritura=escritura;
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            TamanoPagina: '20',
            NumeroPagina: NumeroPagina||'0',
            ScripOrden: ' ORDER BY Cod_Almacen asc',
            ScripWhere: ''
        })
    }
    fetch(URL+'/almacenes_api/get_almacenes', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.respuesta == 'ok') {
                var paginas = parseInt(res.data.num_filas[0].NroFilas)

                paginas = parseInt(paginas / 20) + (paginas % 20 != 0 ? 1 : 0)

                var tipo_almacenes = res.data.tipo_almacenes

                Ver(res.data.almacenes, paginas,NumeroPagina||0, _escritura, tipo_almacenes)
            }
            else
                Ver([])
            $('#main-contenido').waitMe('hide');
        }).catch(function (e) {
            console.log(e);
            swal("Error!",'Ocurrio un error en la conexion o al momento de cargar los datos.  Tipo error : '+e, "error")
            $('#main-contenido').waitMe('hide');
        });
}

export {ListarAlmacenes}