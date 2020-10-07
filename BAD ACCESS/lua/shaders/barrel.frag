#version 120

uniform sampler2D sampler0;
uniform float time;

uniform vec2 textureSize;
uniform vec2 imageSize;

vec2 img2tex( vec2 v ) { return v / textureSize * imageSize; }

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/imageSize.xy;
    
    uv = uv*2.0-1.0;
    float a = abs(uv.y);
    
    uv = uv*(1.0-0.1*a*a);
 
    uv = uv*0.5+0.5;

    uv = img2tex(uv);
    
    gl_FragColor = texture2D(sampler0, fract(uv.xy));
}