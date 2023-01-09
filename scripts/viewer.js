/*----------------------------------------------------------------
  Name:        viewer.js
  Date:        November 2019
  Description: Base code for the - Web Programming - exercise
               (data viewer page)
  Version:     2.0
----------------------------------------------------------------*/

/*---*/


/*-- Initialization function --*/
function init() {

 var prov_style =  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'MediumPurple',
      // lineDash: [4],
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(147, 112, 219, 0.2)'
    })
  }); 	
  
  
  var map1 = new ol.Map({
    target: 'map_container1',
    layers: [
        new ol.layer.Group({
            title: 'Base map',
            layers: [
                new ol.layer.Tile({
                    title: 'Open Street Map',
                    source: new ol.source.OSM(),
                    type: 'base'
                })
            ]
        }),
		 new ol.layer.Group({
            title: 'Land use classifcation',
            layers: [
				new ol.layer.Tile({
					title:'SVM classification',
					// type: 'base',
					source: new ol.source.TileWMS({
					url: "https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s2276895/thailand/configWMS.map&",
					params: {"LAYERS": "svm", "TILED": true}
					})
				}),
				
              new ol.layer.Tile({
					title:'mlc classification',
					// type: 'base',
					source: new ol.source.TileWMS({
					url: "https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s2276895/thailand/configWMS.map&",
					params: {"LAYERS": "mlc", "TILED": true}
					})
				})
            ]
        }),
        new ol.layer.Group({
            title: 'Data',
            layers: [
                new ol.layer.Vector({
				title: 'netherlands provinces',
				source: new ol.source.Vector({
				url: '../services/provinces.py?country_name=netherlands',
				format: new ol.format.GeoJSON({
				defaultDataProjection :'EPSG:4326',
				projection: 'EPSG:3857'
			})
			}),
			style: prov_style,
				name: 'Dutch Provinces'
				})
            ]
        }) 
    ],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [24, 38], zoom: 6
    })
});
 /* osmLayer = new ol.layer.Tile({
    // load OSM (a connector predefined in the API) as source:
    source: new ol.source.OSM()
  });
  // add layer to map:
  map.addLayer(osmLayer); */
  // create a map view:
  map1.setView(
    //center coords and zoom level:
    new ol.View({
      center: ol.proj.transform([6.88, 52.21], 'EPSG:4326', 'EPSG:3857'),
      zoom: 11
    })
  );
  map1.addControl(
    new ol.control.MousePosition({
      projection: 'EPSG:4326',  
      coordinateFormat: ol.coordinate.createStringXY(4)
    })
  );  
   
map1.addControl(new ol.control.LayerSwitcher());
var scale1 = new ol.control.ScaleLine();
map1.addControl(scale1);

var map2 = new ol.Map({
    target: 'map_container2',
    layers: [
        new ol.layer.Group({
            title: 'Base map',
            layers: [
                new ol.layer.Tile({
                    title: 'Open Street Map',
                    source: new ol.source.OSM(),
                    type: 'base'
                })
            ]
        }),
		 new ol.layer.Group({
            title: 'DTM',
            layers: [
				new ol.layer.Tile({
					title:'hillshade DTM',
					// type: 'base',
					source: new ol.source.TileWMS({
					url: "https://gisedu.itc.utwente.nl/cgi-bin/mapserv.exe?map=d:/iishome/student/s2276895/thailand/configWMS.map&",
					params: {"LAYERS": "hillshade", "TILED": true}
					})
				})
				
               /*  new ol.layer.Tile({
                    title: 'Greek Cadastre',
                    type: 'base',
                    visible: false,
                    source: new ol.source.TileWMS({
                        url: cadastreUrl
                    })
                }) */
            ]
        }),
    ],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [24, 38], zoom: 6
    })
});
   map2.setView(
    //center coords and zoom level:
    new ol.View({
      center: ol.proj.transform([6.582, 51.498], 'EPSG:4326', 'EPSG:3857'),
      zoom: 16
    })
  );
  
  map2.addControl(
    new ol.control.MousePosition({
      projection: 'EPSG:4326',  
      coordinateFormat: ol.coordinate.createStringXY(4)
    })
  );  
   
  map2.addControl(new ol.control.LayerSwitcher());
  var scale2 = new ol.control.ScaleLine();
  map2.addControl(scale2);
}