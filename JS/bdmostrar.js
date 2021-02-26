const db = firebase.firestore();
//leer datos de otra forma
var table = document.getElementById('tabla')
db.collection("empleados").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().t_identificacion}</td>
        <td>${doc.data().cedula}</td>
        <td>${doc.data().f_ingreso}</td>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().apellido}</td>
        <td>${doc.data().telefono}</td>
        <td>${doc.data().celular}</td>
        <td>${doc.data().email}</td>
        <td>${doc.data().Dirección}</td>
        <td>${doc.data().f_nacimiento}</td>
        <td>${doc.data().e_civil}</td>
        <td>${doc.data().g_sanguineo}</td>
        <td>${doc.data().Sexo}</td>
        <td>${doc.data().Ncontrato}</td>
        <td>${doc.data().num_Social}</td>
        <td>${doc.data().t_contrato}</td>
        <td>${doc.data().salario}</td>
        <td>${doc.data().cargo}</td>
        <td>${doc.data().Area}</td>
        <td><button  class="btneliminar" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
    </tr>`
    });
});
//Eliminar datos
function eliminar(id) {
    var opcion = confirm("Seguro que quiere eliminar este registro?");
    if (opcion == true) {
        db.collection("empleados").doc(id).delete().then(function () {
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
    db.collection("empleados").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == filtro) {
                table.innerHTML = '';
                tabla.innerHTML += `
                <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().t_identificacion}</td>
                <td>${doc.data().cedula}</td>
                <td>${doc.data().f_ingreso}</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().celular}</td>
                <td>${doc.data().email}</td>
                <td>${doc.data().Dirección}</td>
                <td>${doc.data().f_nacimiento}</td>
                <td>${doc.data().e_civil}</td>
                <td>${doc.data().g_sanguineo}</td>
                <td>${doc.data().Sexo}</td>
                <td>${doc.data().Ncontrato}</td>
                <td>${doc.data().num_Social}</td>
                <td>${doc.data().t_contrato}</td>
                <td>${doc.data().salario}</td>
                <td>${doc.data().cargo}</td>
                <td>${doc.data().Area}</td>
                <td><button  class="btneliminar" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
                </tr>`
                console.log(doc.data().nombre)
            }
        });
    });
}
  


