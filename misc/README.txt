//README.txt

Creating the SVG of the Map and converting it to a .png file for texturing involved the use of SVG, D3.js , GeoJSON, and TopoJSON.

  Documentation:

	  D3.js -	https://d3js.org/
	  GeoJSON - http://geojson.org/
	  TopoJSON	- https://github.com/mbostock/topojson

  Tools:

    SVGCrowbar - http://nytimes.github.io/svg-crowbar/

  Relevant Tutorials:

	 GeoJSON and TopoJSON explained - https://milkator.wordpress.com/2013/03/19/understanding-the-topojson-data-format/
   	 Map Drawing explained - https://bost.ocks.org/mike/map/

----------------------------------------------------------------------------------------------------------------------------------------------------------------	

From Wikipedia on SVG:

"SVG (Scalable Vector Graphics) is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. 
The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999."

----------------------------------------------------------------------------------------------------------------------------------------------------------------

On D3.js:
---------

D3.js is a javascript library used to produce static or dynamic, interactive data-visualizations in the browser, and it uses SVG, HTML5, and CSS standards to do so. You can apply arbitrary data to the DOM, and apply transformations to fit your needs. As stated in the documentation, it is not possible to do "everything" with D3, but you can do some pretty neat stuff, and without a lot of hassle. Under Documentation, the link above has a ton of examples showing the power of D3.js Library.

On GeoJSON and TopoJSON:
------------------------

GeoJSON is a JSON format for encoding geometric data. The most simple object in GeoJSON is usually a shape or Geometry Object. A 'geometry' is described by its 'type' ( i.e the type of Geometry, point, line, polygon etc..) and 'coordinate' properties. The 'type' definition in GeoJSON determines the complexity of the 'coordinate' property. To describe complex shapes, multiple 'geometries'  can placed in a collection. While it is clear that Geometry Objects define shapes, data can be made more meaningful through GeoJSON's Feature Object. A 'feature' is made up of 'geometries' and 'properties'. In GeoJSON a 'properties' can be in any kind of JSON, however and are usually only a single-depth 'key' : 'value' mapping.

Here is an example of what one of these Feature Objects could look like:

	{
  		"type": "Feature",
  		"geometry": {
    		"type": "Point",
    		"coordinates": [0, 0]
  		},
  		"properties": {
    	"name": "null island"
  		}
	}

A collection of Feature Objects placed inside a 'FeatureCollection' can be used to describe a larger, cohesive shape.

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0]
      },
      "properties": {
        "name": "null island"
      }
    }
  ]
}

Map of the world used in this project used to draw maps is stored in a 'FeatureCollection' such as this. However, given the size of the Object for something like the map of the world, there is a nifty implementation of GeoJSON, called TopoJSON, which removes a lot of the redundancies that could be present in a huge FeatureCollection. To quote directly from the specifications on GitHub:

“Rather than representing geometries discretely, geometries in TopoJSON files are stitched together from shared line segments called arcs. TopoJSON eliminates redundancy, offering much more compact representations of geometry than with GeoJSON".

Essentially, the problem addressed in the case of our world map was, is that countries share borders, and hence in GeoJSON some geometry objects have the same line segments stored in coordinate arrays, which is a redundancy. Thus TopoJSON removes these redundancies and reduces file sizes of GeoJSON by nearly 80%! For a more in depth description about what is going on with the conversion form GeoJSON to TopoJSON, you can refer to the link above entitled "GeoJSON to TopoJSON explained".

In order to draw the map, I used D3.js and a GeoJSON file converted into TopoJSON file. To read about the process, you can refer to the link above entitled "Map Drawing". The method of obtaining the maps I desired are essentially the same to the tutorial, excluding some details on how I colored my maps and why. The JavaScript and HTML code for creating the maps with SVG and D3, and generating the .png files are respectively entitled "MapDraw.html" and "MapSave.html". The tool to obtain the SVG, I used a browser bookmarklet called "SVG Crowbar".









