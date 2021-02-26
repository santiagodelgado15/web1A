const db = firebase.firestore();
//Guardar permiso de empleado

const permisoempleado = document.getElementById('permisoempleado');
const guardarpermiso = (codigoempleado,cedula,nombre,apellido,f_permiso,f_desde,f_hasta,t_permiso,autoriza,descripcion) =>
    db.collection('permisos').doc(codigoempleado).set({
        cedula,
        nombre,
        apellido,
        f_permiso,
        f_desde,
        f_hasta,
        t_permiso,
        autoriza,
        descripcion
    });
permisoempleado.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const codigoempleado = permisoempleado['codigoempleado'].value;
    const cedula = permisoempleado['cedula'].value;
    const nombre = permisoempleado['nombre'].value;
    const apellido = permisoempleado['apellido'].value;
    const f_permiso = permisoempleado['f_permiso'].value;
    const f_desde = permisoempleado['f_desde'].value;
    const f_hasta = permisoempleado['f_hasta'].value;
    const t_permiso = permisoempleado['t_permiso'].value;
    const autoriza = permisoempleado['autoriza'].value;
    const descripcion = permisoempleado['descripcion'].value;

    await guardarpermiso(codigoempleado,cedula, nombre, apellido, f_permiso, f_desde, f_hasta,t_permiso,autoriza,descripcion);
    permisoempleado.reset();
})

//buscar
function buscar(){
    var busqueda = document.getElementById("codigoempleado").value; 
    db.collection("empleados").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.id == busqueda){
                console.log(doc.data().nombre);
                document.getElementById("cedula").value=doc.data().cedula;
                document.getElementById("nombre").value=doc.data().nombre; 
                document.getElementById("apellido").value=doc.data().apellido;    
            }
            console.log(`${doc.id} => ${doc.data()}`);      
        });
    });
}
//leer datos de otra forma
var table = document.getElementById('tabla')
db.collection("permisos").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().cedula}</td>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().f_permiso}</td>
        <td>${doc.data().f_desde}</td>
        <td>${doc.data().f_hasta}</td>
        <td>${doc.data().t_permiso}</td>
        <td>${doc.data().autoriza}</td>
        <td>${doc.data().descripcion}</td>
        <td><button type="button" class="btneditar" onclick="editar(
            '${doc.id}',
            '${doc.data().cedula}',
            '${doc.data().nombre}',
            '${doc.data().apellido}',
            '${doc.data().f_permiso}',
            '${doc.data().f_desde}',
            '${doc.data().f_hasta}',
            '${doc.data().t_permiso}',
            '${doc.data().autoriza}',
            '${doc.data().descripcion}'
        )"><img src="./img/boton-editar.png" width="20" height="20" title="Editar"></button></td>
        <td><button type="button" class="btneliminar" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
    </tr>`
    });
});
//Eliminar datos
function eliminar(id) {
    var opcion = confirm("Seguro que quiere eliminar este registro?");
    if (opcion == true) {
        db.collection("permisos").doc(id).delete().then(function () {
            alert("Registro Eliminado");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("No se borro el registro")
    }

}

function editar(id,cedula,nombre,apellido,f_permiso,f_desde,f_hasta,t_permiso,autoriza,descripcion) {
    document.getElementById("codigoempleado").value=id;
    document.getElementById("cedula").value=cedula;
    document.getElementById("nombre").value=nombre;
    document.getElementById("apellido").value=apellido;
    document.getElementById("f_permiso").value=f_permiso;
    document.getElementById("f_desde").value=f_desde;
    document.getElementById("f_hasta").value=f_hasta;
    document.getElementById("t_permiso").value=t_permiso;
    document.getElementById("autoriza").value=autoriza;
    document.getElementById("descripcion").value=descripcion;
    
    var boton = document.getElementById("btnregistrar");
    boton.innerHTML='Editar';
    boton.onclick= function(){
        var washingtonRef = db.collection("permisos").doc(id);
        return washingtonRef.update({
            cedula,
            nombre,
            apellido,
            f_permiso,
            f_desde,
            f_hasta,
            t_permiso,
            autoriza,
            descripcion
        })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML='Guardar';
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }

    
}
//filtro
function filtrar() {
    var filtro = document.getElementById('filtro').value;
    db.collection("permisos").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == filtro) {
                table.innerHTML = '';
                tabla.innerHTML += `
                <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().cedula}</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().f_permiso}</td>
                <td>${doc.data().f_desde}</td>
                <td>${doc.data().f_hasta}</td>
                <td>${doc.data().t_permiso}</td>
                <td>${doc.data().autoriza}</td>
                <td>${doc.data().descripcion}</td>
                <td><button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
                </tr>`
                console.log(doc.data().nombre)
            }
        });
    });
}







  