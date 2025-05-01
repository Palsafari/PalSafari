// src/components/ItineraryMap.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoPath, geoMercator } from "d3-geo";
import { feature as topoFeature } from "topojson-client";
import * as turf from "@turf/turf";
import PropTypes from "prop-types";

// preload all continents (TopoJSON)
import africaTopo from "../assets/africa.json";
import asiaTopo from "../assets/asia.json";
import europeTopo from "../assets/europe.json";
import naTopo from "../assets/north-america.json";
import saTopo from "../assets/south-america.json";
import oceaniaTopo from "../assets/oceania.json";
import antarcticaTopo from "../assets/antarctica.json";

const CONTINENT_TOPO = {
  Africa: africaTopo,
  Asia: asiaTopo,
  Europe: europeTopo,
  "North America": naTopo,
  "South America": saTopo,
  Oceania: oceaniaTopo,
  Antarctica: antarcticaTopo,
};

// geocode each place → { name, coordinates: [lon, lat], country, continent }
async function getCoordinates(place) {
  const apiKey = "cb6efbfab9324b779e170c09305d2536";
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      place
    )}&apiKey=${apiKey}`
  );
  const json = await res.json();
  const feat = json.features?.[0];
  if (!feat) return null;
  return {
    name: place,
    coordinates: feat.geometry.coordinates,
    country: feat.properties.country,
    continent: feat.properties.continent,
  };
}

const ItineraryMap = ({ locations }) => {
  const { t } = useTranslation();
  const [points, setPoints] = useState([]);
  const [continent, setContinent] = useState("Africa");

  // 1) geocode on mount / when locations change
  useEffect(() => {
    (async () => {
      const results = await Promise.all(locations.map(getCoordinates));
      const valid = results.filter((x) => x);
      setPoints(valid);

      // pick the most‐common continent
      const counts = valid.reduce((acc, p) => {
        acc[p.continent] = (acc[p.continent] || 0) + 1;
        return acc;
      }, {});
      const common = Object.keys(counts).sort(
        (a, b) => counts[b] - counts[a]
      )[0];
      setContinent(common || "Africa");
    })();
  }, [locations]);

  // 2) turn TopoJSON → GeoJSON FeatureCollection (only once per continent change)
  const continentGeo = useMemo(() => {
    const topo = CONTINENT_TOPO[continent] || africaTopo;
    // assume the first object in topo.objects
    const objName = Object.keys(topo.objects)[0];
    return topoFeature(topo, topo.objects[objName]);
  }, [continent]);

  // 3) filter to only the countries we need
  const countriesSet = useMemo(
    () => new Set(points.map((p) => p.country)),
    [points]
  );
  const bufferedCountries = useMemo(() => {
    const bufferDistanceKm = 400;

    const selectedFeatures = continentGeo.features.filter((f) =>
      countriesSet.has(f.properties.ADMIN || f.properties.NAME)
    );

    if (selectedFeatures.length === 0) {
      return {
        type: "FeatureCollection",
        features: [],
      };
    }

    // Merge into a single feature
    const merged = selectedFeatures.reduce((acc, cur) => {
      return acc ? turf.union(acc, cur) : cur;
    }, null);

    // Create buffer area
    const buffer = turf.buffer(merged, bufferDistanceKm, {
      units: "kilometers",
    });

    // Filter all countries intersecting the buffer
    return {
      type: "FeatureCollection",
      features: continentGeo.features.filter((f) =>
        turf.booleanIntersects(buffer, f)
      ),
    };
  }, [continentGeo, countriesSet]);

  // 4) build your route as GeoJSON
  const routeGeoJson =
    points.length > 1
      ? {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: points.map((p) => p.coordinates),
          },
        }
      : null;

  // 5) build & fit your projection to the filtered countries + route
  const projection = useMemo(() => {
    const proj = geoMercator();

    // combine the country features + the route
    const allFeatures = [
      ...bufferedCountries.features,
      ...(routeGeoJson ? [routeGeoJson] : []),
    ];
    const fc = { type: "FeatureCollection", features: allFeatures };

    // fit into a 800×600 viewBox with 20px padding
    proj.fitExtent(
      [
        [20, 20],
        [780, 580],
      ],
      fc
    );

    return proj;
  }, [bufferedCountries, routeGeoJson]);

  const pathGen = geoPath().projection(projection);

  return (
    <ComposableMap
      projection={projection}
      width={800}
      height={600}
      style={{ width: "100%", height: "auto" }}
    >
      {/* draw only the filtered countries */}
      <Geographies geography={bufferedCountries}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#F5F5DC"
              stroke="#999"
            />
          ))
        }
      </Geographies>

      {/* country labels */}
      {bufferedCountries.features.map((f, i) => {
        const centroid = pathGen.centroid(f); // use the same projection path
        return (
          <text
            key={`label-${i}`}
            x={centroid[0]}
            y={centroid[1]}
            textAnchor="middle"
            style={{ fontSize: 15, fill: "#555" }}
          >
            {t(f.properties.ADMIN || f.properties.NAME)}
          </text>
        );
      })}

      {/* draw the itinerary line */}
      {routeGeoJson && (
        <path
          d={pathGen(routeGeoJson)}
          fill="none"
          stroke="#0b803a"
          strokeWidth={2}
        >
          <animate
            attributeName="stroke-dasharray"
            from="0,1000"
            to="1000,0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* draw numbered stops */}
      {points.map(({ coordinates, name }, i) => (
        <Marker key={i} coordinates={coordinates}>
          <circle r={6} fill="#ea580c" />
          <text
            x={0}
            y={15}
            textAnchor="middle"
            style={{
              fontSize: 14,
              fill: "#000",
              fontWeight: "bold",
              paintOrder: "stroke",
              stroke: "#fff",
              strokeWidth: 3,
              strokeLinejoin: "round",
            }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

ItineraryMap.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ItineraryMap;
