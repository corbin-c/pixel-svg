# pixel-svg
Pixel-svg is a web tool by Clément Corbin. It performs pixel-art-like vectorization over HTML Canvas & JS (requires ES6+). Output is SVG.

Grid size and output image width are configurable. A color filter (highly perfectible) is also available.

Try it online: https://corbin-c.github.io/pixel-svg

Examples
---------

Original image from [wikimedia commons](https://commons.wikimedia.org/wiki/File:Amelia_Earhart_-_GPN-2002-000211.jpg):
[Amelia Earhart](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Amelia_Earhart_-_GPN-2002-000211.jpg/800px-Amelia_Earhart_-_GPN-2002-000211.jpg)
After pixelization (image filtered for black, 40% threshold, 800px width, 6px grid):
[Amelia Earhart, big pixels](Amelia_Earhart_-_GPN-2002-000211.svg)

Original image from [wikimedia commons](https://commons.wikimedia.org/wiki/File:MosMetro_Fonvizinskaya_01-2017.jpg/800px-MosMetro_Fonvizinskaya_01-2017.jpg):
[Moscow Metro](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/MosMetro_Fonvizinskaya_01-2017.jpg/800px-MosMetro_Fonvizinskaya_01-2017.jpg)
After pixelization:
[Moscow Metro, big pixels](MosMetro_Fonvizinskaya_01-2017.jpg/800px-MosMetro_Fonvizinskaya_01-2017.jpg.svg)
