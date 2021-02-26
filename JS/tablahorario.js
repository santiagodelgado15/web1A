const db = firebase.firestore();

//leer datos de otra forma
var table = document.getElementById('tabla')
db.collection("horarios").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach(doc => {
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().cedula}</td>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().horariol}</td>
        <td>${doc.data().horariom}</td>
        <td>${doc.data().horariomi}</td>
        <td>${doc.data().horarioj}</td>
        <td>${doc.data().horariov}</td>
        <td>${doc.data().horariosa}</td>
        <td>${doc.data().horariod}</td>
        <td><button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
    </tr>`
    });
});
//Eliminar datos
function eliminar(id) {
    var opcion = confirm("Seguro que quiere eliminar este registro?");
    if (opcion == true) {
        db.collection("horarios").doc(id).delete().then(function () {
            alert("Registro Eliminado");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        alert("No se borro el registro")
    }

}



//var busqueda = document.getElementById("codigoempleado").value;
function filtrar() {
    var filtro = document.getElementById('filtro').value;
    db.collection("horarios").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == filtro) {
                table.innerHTML = '';
                tabla.innerHTML += `
                <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().cedula}</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().horariol}</td>
                <td>${doc.data().horariom}</td>
                <td>${doc.data().horariomi}</td>
                <td>${doc.data().horarioj}</td>
                <td>${doc.data().horariov}</td>
                <td>${doc.data().horariosa}</td>
                <td>${doc.data().horariod}</td>
                <td><button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
                </tr>`
                console.log(doc.data().nombre)
            }
        });
    });
}
