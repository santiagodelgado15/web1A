const db = firebase.firestore();

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
        <td><button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
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