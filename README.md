# pedrovazquezax.github.io

Portafolio personal de Pedro Vázquez (desarrollador iOS). HTML, CSS y JS puros, sin frameworks ni paso de build. Se publica con GitHub Pages.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Versión en español |
| `en/index.html` | Versión en inglés |
| `assets/css/styles.css` | Estilos y temas claro/oscuro (variables CSS) |
| `assets/js/main.js` | Tema (sigue al sistema y se puede cambiar), menú móvil y botones flotantes |
| `assets/cv/` | PDFs públicos del CV (sin teléfono) |
| `cv-src/` | Fuente de los CV y de la imagen para compartir. `./cv-src/build.sh` regenera los PDF y `assets/img/og.png` (requiere Google Chrome) |

## Probar en local

```sh
python3 -m http.server 8000
# abrir http://127.0.0.1:8000/
```

## Notas

- La foto de perfil está comentada en ambos HTML. Para mostrarla: agrega `assets/img/profile.jpg` (cuadrada, mínimo 480 px) y quita los marcadores `<!-- -->` alrededor de la etiqueta `<img>`.
- Los clientes confidenciales (empresa minorista multinacional, medio financiero global) se mencionan solo de forma genérica.
