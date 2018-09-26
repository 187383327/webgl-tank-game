import * as THREE from 'three';

class Map {
    constructor(x, y, vector, scene){
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.mesh = {};
        this.vector = vector == {}? {x:0,z:0}:vector;
    }
    draw(){
        var geometry = new THREE.BoxGeometry( 2, 2, 2 );
        var material = new THREE.MeshLambertMaterial({
            // wireframe:true,
            color: 0x00ff00,
            emissive: '#333333',
        });

        var cube = new THREE.Mesh( geometry, material );
        this.mesh = cube;
        this.scene.add( cube );
    }
    
    
}

export default Map;