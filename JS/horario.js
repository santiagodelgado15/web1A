const db = firebase.firestore();

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
            if(doc.id == null){
                alert("no hay registros en la base de datos")
            }
            console.log(`${doc.id} => ${doc.data()}`);      
        });
    });
}

//Guardar horario   

const horarioempleado = document.getElementById('horarioempleado');
const guardarpermiso = (codigoempleado,cedula,nombre,apellido,horariol,horariom,horariomi,horarioj,horariov,horariosa,horariod) =>
    db.collection('horarios').doc(codigoempleado).set({
        cedula,
        nombre,
        apellido,
        horariol,
        horariom,
        horariomi,
        horarioj,
        horariov,
        horariosa,
        horariod
        
    });
horarioempleado.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const codigoempleado = horarioempleado['codigoempleado'].value;
    const cedula = horarioempleado['cedula'].value;
    const nombre = horarioempleado['nombre'].value;
    const apellido = horarioempleado['apellido'].value;
    const horariol = horarioempleado['horariol'].value;
    const horariom = horarioempleado['horariom'].value;
    const horariomi = horarioempleado['horariomi'].value;
    const horarioj = horarioempleado['horarioj'].value;
    const horariov = horarioempleado['horariov'].value;
    const horariosa = horarioempleado['horariosa'].value;
    const horariod = horarioempleado['horariod'].value;
    

    await guardarpermiso(codigoempleado,cedula,nombre,apellido,horariol,horariom,horariomi,horarioj,horariov,horariosa,horariod);
    horarioempleado.reset();
})
//leer datos de otra forma
var table = document.getElementById('tabla')
db.collection("horarios").onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
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
        <td><button type="button" class="btneditar" onclick="editar(
            '${doc.id}',
            '${doc.data().cedula}',
            '${doc.data().nombre}',
            '${doc.data().apellido}',
            '${doc.data().horariol}',
            '${doc.data().horariom}',
            '${doc.data().horariomi}',
            '${doc.data().horarioj}',
            '${doc.data().horariov}',
            '${doc.data().horariosa}',
            '${doc.data().horariod}'
        )"><img src="./img/boton-editar.png" width="20" height="20" title="Editar"></button></td>
        <td><button type="button" class="btneliminar" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
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
//editar datos
function editar(id,cedula,nombre,apellido,horariol,horariom,horariomi,horarioj,horariov,horariosa,horariod) {
    document.getElementById("codigoempleado").value=id;
    document.getElementById("cedula").value=cedula;
    document.getElementById("nombre").value=nombre;
    document.getElementById("horariol").value=horariol;
    document.getElementById("horariom").value=horariom;
    document.getElementById("horariomi").value=horariomi;
    document.getElementById("horarioj").value=horarioj;
    document.getElementById("horariov").value=horariov;
    document.getElementById("horariosa").value=horariosa;
    document.getElementById("horariod").value=horariod;
    
    var boton = document.getElementById("btnregistrar");
    boton.innerHTML='Editar';
    boton.onclick= function(){
        var washingtonRef = db.collection("horarios").doc(id);
        return washingtonRef.update({
            cedula,
            nombre,
            apellido,
            horariol,
            horariom,
            horariomi,
            horarioj,
            horariov,
            horariosa,
            horariod
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

