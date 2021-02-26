const db = firebase.firestore();

const datoempleado = document.getElementById('datoempleado');
const guardar = (codigo,t_identificacion,cedula,f_ingreso,nombre,apellido,telefono,celular,email,
    Dirección,f_nacimiento,e_civil,g_sanguineo,Sexo,Ncontrato,num_Social,t_contrato,salario,cargo,Area) =>
    db.collection('empleados').doc(codigo).set({
        t_identificacion,
        cedula,
        f_ingreso,
        nombre,
        apellido,
        telefono,
        celular,
        email,
        Dirección,
        f_nacimiento,
        e_civil,
        g_sanguineo,
        Sexo,
        Ncontrato,
        num_Social,
        t_contrato,
        salario,
        cargo,
        Area
    });

datoempleado.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const codigo = datoempleado['codigo'].value;
    const t_identificacion = datoempleado['t_identificacion'].value;
    const cedula = datoempleado['cedula'].value;
    const f_ingreso =  datoempleado['f_ingreso'].value;
    const nombre =  datoempleado['nombre'].value;
    const apellido =  datoempleado['apellido'].value;
    const telefono =  datoempleado['telefono'].value;
    const celular =  datoempleado['celular'].value;
    const email =  datoempleado['email'].value;
    const Dirección =  datoempleado['Dirección'].value;
    const f_nacimiento =  datoempleado['f_nacimiento'].value;
    const e_civil =  datoempleado['e_civil'].value;
    const g_sanguineo =  datoempleado['g_sanguineo'].value;
    const Sexo =  datoempleado['Sexo'].value;
    const Ncontrato =  datoempleado['Ncontrato'].value;
    const num_Social =  datoempleado['num_Social'].value;
    const t_contrato =  datoempleado['t_contrato'].value;
    const salario =  datoempleado['salario'].value;
    const cargo =  datoempleado['cargo'].value;
    const Area =  datoempleado['Area'].value;

    await guardar(codigo,t_identificacion,cedula,f_ingreso,nombre,apellido,telefono,celular,email,
        Dirección,f_nacimiento,e_civil,g_sanguineo,Sexo,Ncontrato,num_Social,t_contrato,salario,cargo,Area);
    
    datoempleado.reset();
    
   
})
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
        <td><button type="button" class="btneditar" onclick="editar(
        '${doc.id}',
        '${doc.data().t_identificacion}',
        '${doc.data().cedula}',
        '${doc.data().f_ingreso}',
        '${doc.data().nombre}',
        '${doc.data().apellido}',
        '${doc.data().telefono}',
        '${doc.data().celular}',
        '${doc.data().email}',
        '${doc.data().Dirección}',
        '${doc.data().f_nacimiento}',
        '${doc.data().e_civil}',
        '${doc.data().g_sanguineo}',
        '${doc.data().Sexo}',
        '${doc.data().Ncontrato}',
        '${doc.data().num_Social}',
        '${doc.data().t_contrato}',
        '${doc.data().salario}',
        '${doc.data().cargo}',
        '${doc.data().Area}'
        )"><img src="./img/boton-editar.png" width="20" height="20" title="Editar"></button></td>
        <td><button type="button" class="btneliminar" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
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
//editar datos
function editar(id,t_identificacion,cedula,f_ingreso,nombre,apellido,telefono,celular,email,Dirección,f_nacimiento,e_civil,g_sanguineo,Sexo,Ncontrato,num_Social,t_contrato,salario,cargo,Area) {
    document.getElementById("codigo").value=id;
    document.getElementById("t_identificacion").value=t_identificacion;
    document.getElementById("cedula").value=cedula;
    document.getElementById("f_ingreso").value=f_ingreso;
    document.getElementById("nombre").value=nombre;
    document.getElementById("apellido").value=apellido;
    document.getElementById("telefono").value=telefono;
    document.getElementById("celular").value=celular;
    document.getElementById("email").value=email;
    document.getElementById("Dirección").value=Dirección;
    document.getElementById("f_nacimiento").value=f_nacimiento;
    document.getElementById("e_civil").value=e_civil;
    document.getElementById("g_sanguineo").value=g_sanguineo;
    document.getElementById("Sexo").value=Sexo;
    document.getElementById("Ncontrato").value=Ncontrato;
    document.getElementById("num_Social").value=num_Social;
    document.getElementById("t_contrato").value=t_contrato;
    document.getElementById("salario").value=salario;
    document.getElementById("cargo").value=cargo;
    document.getElementById("Area").value=Area;
    var boton = document.getElementById("btnregistrar");
    boton.innerHTML='Editar';
    boton.onclick= function(){
        var washingtonRef = db.collection("empleados").doc(id);
        return washingtonRef.update({
            t_identificacion,
            cedula,
            f_ingreso,
            nombre,
            apellido,
            telefono,
            celular,
            email,
            Dirección,
            f_nacimiento,
            e_civil,
            g_sanguineo,
            Sexo,
            Ncontrato,
            num_Social,
            t_contrato,
            salario,
            cargo,
            Area
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
                <td><button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')"><img src="./img/eliminar.png" width="20" height="20" title="Eliminar" /></button></td>
                </tr>`
                console.log(doc.data().nombre)
            }
        });
    });
}