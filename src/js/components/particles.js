import * as THREE from 'three';

class Particles{
    // var particles;
    
    constructor(count){
        // init the instance of the particles system;
        this.particleCount = count,
        this.particles = new THREE.Geometry();
        for(var p = 0; p < this.particleCount; p++) {
            //particle is between -250~250
            var pX = Math.random() * 500 - 250,
                pY = Math.random() * 500 - 250,
                pZ = Math.random() * 500 - 250,
                particle = new THREE.Vector3( pX, pY, pZ);
            // add the particle to the gemotry
            particle.velocity = new THREE.Vector3(0,-Math.random(),0);
            this.particles.vertices.push(particle);

            // ps.geometry.colors[i] = new THREE.Color(rnd, rnd / 4, 0);
            var r = (250-pX)/500;
            var g = (250-pY)/500;
            var b = (250-pZ)/500;
            this.particles.colors.push(new THREE.Color(r,g,b));
        }

        //create the marterial of the particles
        // console.log(this.particles.colors);
        // this.pMaterial = new THREE.PointsMaterial( {vertexColors:true, size: 5, sizeAttenuation: false, color:0x000fff } );
        this.pMaterial = new THREE.PointsMaterial({vertexColors:this.particles.colors, 
            size: 2, sizeAttenuation: true,  } );

        
        //make particleSystem object as a property of the particle Class
        
        this.particleSystem =
            new THREE.Points(
            this.particles,
            this.pMaterial);
        
        this.particleSystem.geometry.colorsNeedUpdate = true;
        
    }

    updateParticles(){
        // add some rotation to the system
        // this.particleSystem.rotation.y += 0.01;

        var pCount = this.particleCount;
        for (var i=0;i<this.particleCount;i++) {
            // get the particle
            var particle = this.particleSystem.geometry.vertices[i];

            // check if we need to reset
            if (particle.y < -200) {
                particle.y = 200;
                particle.velocity.y = 0;
            }
           
            // update the velocity with
            // a splat of randomniz
            particle.velocity.y += Math.random() * .1;
            particle.y -= particle.velocity.y;

        }
        /**
         * need this statement to force update the element of the point system.
         */

        this.particleSystem.geometry.verticesNeedUpdate = true;
        // this.particleSystem.geometry.__dirtyVertices = true;
    }
    

}

export default Particles;