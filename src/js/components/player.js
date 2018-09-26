import * as THREE from 'three';
// import * as teapot from '../assets/teapot.json';

class Player {
    constructor(pos, vector, scene){
        this.pos = pos;
        this.vector = vector;
        this.scene = scene;
        this.mesh = null;
        this.angle = 0;
        //this v represent the abs of the vector;
        this.v = 0;
    }
    draw(){
        // var geometry = new THREE.BoxGeometry( 5, 5, 5 );
        // var material = new THREE.MeshLambertMaterial({
        //     // wireframe:true,
        //     color: 0x00ff00,
        //     emissive: '#333333',
        // });
        //
        // var cube = new THREE.Mesh( geometry, material );
        // this.mesh = cube;
        // this.scene.add( cube );

        // instantiate a loader
        var loader = new THREE.ObjectLoader();
        var self = this;
        // load a resource
        loader.load(
      	// resource URL
      	"./assets/models/tank.json",

      	// onLoad callback
      	// Here the loaded data is assumed to be an object
      	function ( obj ) {
          self.mesh = obj;
          self.mesh.scale.x = 3;
          self.mesh.scale.y = 3;
          self.mesh.scale.z = 3;

          // self.mesh.rotation.y = Math.PI/2;
      		// Add the loaded object to the scene
      		self.scene.add( obj );

          // console.log(self.mesh);

      	},

      	// onProgress callback
      	function ( xhr ) {
      		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      	},

      	// onError callback
      	function ( err ) {
      		console.error( 'An error happened' );
      	}
      );
    }

    changeVector(){
        // update vector angle
        this.vector = {
            x: Math.sin(this.mesh.rotation.y + Math.PI/2) * this.v,
            y: 0,
            z: Math.cos(this.mesh.rotation.y + Math.PI/2) * this.v,
        };
        this.angle = this.mesh.rotation.y;
    }

    move(direction){
        switch(direction){
            case'left':
                this.mesh.rotation.y += 0.1;
                this.changeVector();
                break;
            case'right':
                this.mesh.rotation.y -= 0.1;
                this.changeVector();
                break;
            case'forward':
                this.v = 0.1;
                this.changeVector();
                break;
            case'back':
                this.v = 0;
                this.changeVector();
                break;
            default:
            break;
        }
    }
    updateMove(){
        if(this.mesh == null){

        }else{
          this.mesh.position.x += this.vector.x;
          this.mesh.position.z += this.vector.z;
        }

    }

    attack(){

    }
}

export default Player;
