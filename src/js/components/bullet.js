import * as THREE from 'three';

class Bullet {
    constructor(position, vector, scene){
        this.scene = scene;
        this.mesh = {};
        this.vector = vector;
        this.position = position;
    }
    draw(){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var geometry = new THREE.SphereGeometry( 5, 5, 5 );
        var material = new THREE.MeshLambertMaterial({
            // wireframe:true,
            color: 0xffff00,
            emissive: '#333333',
        });
        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = this.position.x;
        sphere.position.y = this.position.y;
        sphere.position.z = this.position.z;
        this.mesh = sphere;
        this.scene.add( sphere );
    }
    move(x, z){
        this.mesh.position.x += this.vector.x;
        this.mesh.position.y += this.vector.y;
        this.mesh.position.z += this.vector.z;
    }
    destroy(){
        this.scene.remove(this.mesh);
    }
}

export default Bullet;
