// var app = new Vue({
//   el: '#app',
//   data: {
//     scanner: null,
//     activeCameraId: null,
//     cameras: [],
//     scans: []
//   },
//   mounted: function () {
//     var self = this;
//     self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
//     self.scanner.addListener('scan', function (content, image) {
//       self.scans.unshift({ date: +(Date.now()), content: content });
//     });
//     Instascan.Camera.getCameras().then(function (cameras) {
//       self.cameras = cameras;
//       if (cameras.length > 0) {
//         self.activeCameraId = cameras[0].id;
//         self.scanner.start(cameras[0]);
//       } else {
//         console.error('No cameras found.');
//       }
//     }).catch(function (e) {
//       console.error(e);
//     });
//   },
//   methods: {
//     formatName: function (name) {
//       return name || '(unknown)';
//     },
//     selectCamera: function (camera) {
//       this.activeCameraId = camera.id;
//       this.scanner.start(camera);
//     }
//   }
// });


window.onload=function(){


    var app={
        activeCameraId: null
    };

    // var cameraObject={
    //
    // };

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        scanner.addListener('scan', function (content) {
       	 // aqui seria donde pondriamos insertar
          // alert(content);
          // console.log(content);
          var scansList=document.querySelector('#scans');
          var li=document.createElement('li');
          li.innerHTML=content;
          scansList.appendChild(li);
          // clearInterval(i);
        });

        Instascan.Camera.getCameras().then(function (cameras) {
       	  // console.log(cameras);
          printCameras(cameras);

         if(cameras.length > 0){
             selectCamera(cameras[0]);
         }
         else
         {
             console.error('No cameras found.')
         }


        }).catch(function (e) {
          console.error(e);
        });

    // PARTE QUE MUEVE LA LINEA
       var num=0,op=0;
	   var linea=document.getElementById('line');
       var i=setInterval(function () {

		if (num==100) {op=1;}
		if (num==0) {op=0;}
		// console.log(num);

    	  linea.style.top=num+"%";
    	  op==1?num--:num++;

  		}, 10);

    function selectCamera(camera){
        // cameraObject.id=camera.id;
        // cameraObject.name=camera.name;
        console.log(camera.name);
        scanner.start(camera);
    }

    function printCameras(arrayCameras){
        for (var i = 0; i < arrayCameras.length; i++) {
            var camerasList=document.querySelector('#camerasList');

            var li=document.createElement('button');
            li.id=arrayCameras[i].id;
            li.innerHTML=arrayCameras[i].name==null?"Desconocido":arrayCameras[i].name;

            camerasList.appendChild(li);

        }
    }
}
