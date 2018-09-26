'use strict';
import * as THREE from 'three';

if (module.hot) {
  module.hot.accept();
}

import Utils from './components/utils';
import Player from './components/player';
import Bullet from './components/bullet';

window.onload = function(){

    let container = document.getElementById('gl-output');
    let width = container.clientWidth,height = container.clientHeight;
    //init scene
    var scene = new THREE.Scene();
    var group = new THREE.Group();
    scene.add( group );
    //creating the renderer to render things....
    var renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor( 0xffffff );
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    container.appendChild( renderer.domElement );
    renderer.domElement.id = 'gl-canvas';

    //init camera, light
    var utils = new Utils(scene,width,height);
    var camera =utils.camera;
    scene.add(camera);
    var light = utils.light;
    scene.add(light);
    //axes
    var axes = new THREE.AxesHelper(100);
    scene.add(axes);
    //grid xz
    var gridXZ = new THREE.GridHelper(100, 10);
    scene.add(gridXZ);

    var bullet_arr = [];
        var vector = {x:0, y:0, z:0};
        var pos = {x:0, y:0, z:0};
        var player = new Player(pos, vector,scene);
        player.draw();

        // keyboard and mouse control the character
        window.onkeydown = function (e) {

          var code = e.keyCode ? e.keyCode : e.which;
          switch(code){
            case 37: //left
              // vector = {x:-0.1, z:0};
              player.move('left');
              break;
            case 39: //right
              player.move('right');
              break;
            case 38: //up
              player.move('forward');
              break;
            case 40: //down
              player.move('back');
              break;
            case 32: //fire
              let pos = {
                x: player.mesh.position.x,
                y: player.mesh.position.y,
                z: player.mesh.position.z,
              };
              // v should be larger then player otherwise, looks like uniform
              // motion, the player will hide the bullet;
              let v = {
                x: Math.sin(player.angle + Math.PI/2)/2,
                y: 0,
                z: Math.cos(player.angle + Math.PI/2)/2
              };
              let bullet = new Bullet(pos, v, scene);
              bullet_arr.push(bullet);
              bullet.draw();
              break;
            default:
              break;
          }
      };


    var animate = function () {
      player.updateMove();

      // console.log(bullet_arr);
      // bullet movement and free memory
      for(let i = 0; i<bullet_arr.length; i++){
        bullet_arr[i].move();
        if(bullet_arr.length !== null && bullet_arr){
          if(bullet_arr[i].mesh.position.x > 50 || bullet_arr[i].mesh.position.x < -50 || bullet_arr[i].mesh.position.z > 50 || bullet_arr[i].mesh.position.z < -50){
            bullet_arr[i].destroy();
            bullet_arr.splice(i,1);
            i--;
          }
        }
      }

      renderer.render(scene, camera);

      //call animate function again
      requestAnimationFrame( animate );

    };

    animate();


};
