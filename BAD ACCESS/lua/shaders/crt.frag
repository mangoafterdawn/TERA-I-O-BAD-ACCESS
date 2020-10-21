//Original shader by NAYOTO, slightly modified by me.

#define PI 3.14159265

uniform int cel;

varying vec4 color;
varying vec2 imageCoord;

uniform float time;
uniform vec2 resolution;
uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;

vec2 img2tex( vec2 v ) { return v / textureSize * imageSize; }

void main()
{
	vec2 uv = imageCoord;
	vec2 texel = 0.5 / resolution;
	vec3 col = vec3(0.0);
	
	uv = (uv - 0.5) * 2.0;
	uv.x *= 1.0 + pow(uv.y / 4.8, 2.0);
	uv.y *= 1.0 + pow(uv.x / 4.8, 2.0);
	uv = uv * 1.01;
	uv = uv * 0.5 + 0.5;

	if( mod(floor(uv.x * resolution.x),2.0) == 0.0 )
		uv.y += texel.y;

	if( min(uv.x,uv.y) > 0.0 && max(uv.x,uv.y) < 1.0 )
	{
		col = texture2D( sampler0, img2tex(uv) ).rgb;

		if( cel > 0 )
			col = floor( col * float(cel) + 0.5 ) / float(cel);

		col.r = texture2D( sampler0, img2tex(uv - texel / 2.0) ).r;
		col.b = texture2D( sampler0, img2tex(uv + texel / 2.0) ).b;
		
		//Factors modified. -Pull
		col *= 1.0 - sin(PI * uv.x * resolution.x / 1.0) * 0.2;
		col *= 1.0 - cos(PI * uv.y * resolution.y / 2.0) * 0.2;

		col *= 1.0 - fract(sin(uv.y + time * 0.4)) * 0.3;
		//col *= 1.0 - length(0.5 - uv) * 0.1;
	}

	gl_FragColor = vec4( col, 1.0 ) * color;
}
