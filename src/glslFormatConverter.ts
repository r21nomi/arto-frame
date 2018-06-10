export class GLSLFormatConverter {

    public toGLSLViewerFormat(inputGLSL: String): String {
        return inputGLSL
            .replace(/float time;/, 'float u_time;\nfloat time = u_time;')
            .replace(/vec2 resolution;/, 'vec2 u_resolution;\nvec2 resolution = u_resolution;')
            .replace(/vec2 mouse;/, 'vec2 u_mouse;\nvec2 mouse = u_mouse;')
    }
}