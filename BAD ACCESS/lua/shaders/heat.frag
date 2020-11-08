#version 120

varying vec2 textureCoord;
uniform sampler2D sampler0;
uniform float tx,ty,yo;
uniform float exp = 1;
varying vec4 color;

uniform vec2 textureSize;
uniform vec2 imageSize;

vec2 SineWave( vec2 p )
    {
    
	//expand so that there's no ugly edges
    p.x=(p.x*exp);
    p.y=(p.y*exp);
	
    // wave distortion
    float x = sin( 25.0*p.y + 30.0*p.x + 6.28*tx) * 0.05 * yo;
    float y = sin( 25.0*p.y + 30.0*p.x + 6.28*ty) * 0.05 * yo;
    return vec2(p.x+x, p.y+y);
    }

void main()
    {
    gl_FragColor = texture2D(sampler0,SineWave(textureCoord))*color;
    }